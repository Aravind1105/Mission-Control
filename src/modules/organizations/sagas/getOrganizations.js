import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { getOrganizations as action, updateOrganizations } from '../actions';

function handlerGetOrganizations() {
  const token = ls.getItem(TOKEN_STORAGE_KEY);

  return fetch('/api/v1/organizations', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function* handler() {
  const response = yield call(handlerGetOrganizations);
  const data = yield call([response, response.json]);

  yield put(updateOrganizations(data));
}

export default function* saga() {
  yield takeLatest(action, handler);
}
