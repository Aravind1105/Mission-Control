import { all, call, put, takeEvery } from 'redux-saga/effects';
import auth0 from 'auth0-js';
import get from 'lodash/get';

import history from 'lib/history';
import LivelloLS from 'lib/localStorage';
import gqlOrganization from 'lib/https/gqlOrganization';
import {
  USER_SAGA_AUTHENTICATE,
  USER_SAGA_HANDLE_AUTH,
  USER_SAGA_RENEW_SESSION,
  USER_SAGA_LOGOUT,
  updateUser,
} from '../actions';
import {
  AUTH_ENTRY_STORAGE_KEY,
  IS_AUTH_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from '../constants';
import { extractUserData } from '../helpers';
import { GET_SELF_INFO_QUERY } from '../schema';

const authConfig = {
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  redirectUri: window.location.origin,
  responseType: 'token id_token',
  scope: 'openid profile email admin',
  audience: process.env.AUTH_AUDIENCE,
  redirect: false,
};

export const auth = new auth0.WebAuth(authConfig);

function* authenticate() {
  LivelloLS.setItem(AUTH_ENTRY_STORAGE_KEY, window.location.pathname);
  yield auth.authorize({});
}

function parseHash() {
  return new Promise((resolve, reject) => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        resolve(authResult);
      } else if (err) {
        reject(err);
      }
    });
  });
}

function checkSession() {
  return new Promise((resolve, reject) => {
    auth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        resolve(authResult);
      } else if (err) {
        reject(err);
      }
    });
  });
}

function* updateUserState(userPayload) {
  yield put(updateUser(userPayload));
}

function* getUserDetailsFromApi() {
  const { data } = yield call(gqlOrganization.query, {
    query: GET_SELF_INFO_QUERY,
  });

  return data.getSelf;
}

function* logout() {
  yield call(updateUserState, { auth: false });
  yield LivelloLS.removeItem(IS_AUTH_STORAGE_KEY);
  yield LivelloLS.removeItem(TOKEN_STORAGE_KEY);

  window.location.href = `https://${authConfig.domain}/v2/logout?returnTo=${authConfig.redirectUri}&client_id=${authConfig.clientID}`;
}

function* processAuthData() {
  try {
    const result = yield call(parseHash);

    yield LivelloLS.setItem(IS_AUTH_STORAGE_KEY, 'true');
    yield LivelloLS.setItem(TOKEN_STORAGE_KEY, result.accessToken);

    // Get user from api, should use SDK later
    const userDetails = yield call(getUserDetailsFromApi);
    const hasRule = get(userDetails, 'rolesInOrganizations', []).some(
      ({ role }) => role === 'admin' || role === 'root',
    );
    const isRoot = get(userDetails, 'root', false);

    if (hasRule || isRoot) {
      yield call(updateUserState, {
        auth: true,
        ...result.idTokenPayload,
        ...userDetails,
      });

      // LS Cleanup
      const replaceUrl = LivelloLS.getItem(AUTH_ENTRY_STORAGE_KEY);
      yield history.replace(replaceUrl || '/');
      LivelloLS.removeItem(AUTH_ENTRY_STORAGE_KEY);
    } else {
      yield put(logout());
    }
  } catch (e) {
    history.replace('/');
    // TODO: Some error notification
  }
}

export function* renewSession() {
  const isAuth = LivelloLS.getItem(IS_AUTH_STORAGE_KEY);

  if (isAuth) {
    try {
      const result = yield call(checkSession);

      // Get user from api, should use SDK later
      const userDetails = yield call(getUserDetailsFromApi);
      const hasRule = get(userDetails, 'rolesInOrganizations', []).some(
        ({ role }) => role === 'admin' || role === 'root',
      );
      const isRoot = get(userDetails, 'root', false);
      if (hasRule || isRoot) {
        yield call(updateUserState, {
          auth: true,
          ...extractUserData(result),
          ...userDetails,
        });
        yield LivelloLS.setItem(TOKEN_STORAGE_KEY, result.accessToken);
        window.history.replaceState('', document.title, ' ');
      } else {
        yield put(logout());
      }
    } catch (e) {
      console.log(e);
      // TODO: Some error notification
    }
  }
}

function* handleRenewSession() {
  yield takeEvery(USER_SAGA_RENEW_SESSION, renewSession);
}

function* handleAuthentication() {
  yield takeEvery(USER_SAGA_HANDLE_AUTH, processAuthData);
}

function* handleLogout() {
  yield takeEvery(USER_SAGA_LOGOUT, logout);
}

function* handleLogin() {
  yield takeEvery(USER_SAGA_AUTHENTICATE, authenticate);
}

export default function* authenticateSaga() {
  yield all([
    handleLogin(),
    handleAuthentication(),
    handleRenewSession(),
    handleLogout(),
  ]);
}
