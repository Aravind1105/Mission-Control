import { all, call, put, takeEvery } from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  USERS_SAGA_SET_ROOT,
  USERS_SAGA_LOAD,
  updateUsers,
  updateUserById,
} from '../actions/usersActions';

function* loadUsers() {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = yield call([response, response.json]);

  yield put(updateUsers(data));
}

function* setRoot(action) {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(
    fetch,
    `/api/v1/users/${action.payload._id}/setRoot`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ root: action.payload.value }),
    },
  );

  const data = yield call([response, response.json]);

  yield put(updateUserById(data));
}

function* handleSetRoot() {
  yield takeEvery(USERS_SAGA_SET_ROOT, setRoot);
}

function* handleLoadUsers() {
  yield takeEvery(USERS_SAGA_LOAD, loadUsers);
}

export default function* usersSaga() {
  yield all([handleLoadUsers(), handleSetRoot()]);
}
