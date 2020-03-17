import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { getKiosk, getKioskSuccess } from '../actions';

function handlerRequest(id) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);

  return fetch(`/api/v1/kiosks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

function* handler({ payload }) {
  try {
    const response = yield call(handlerRequest, payload);
    const data = yield call([response, response.json]);

    if ('error' in data && data.status !== 200) {
      throw Error('error in saga');
    }
    yield put(getKioskSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getKiosk, handler);
}
