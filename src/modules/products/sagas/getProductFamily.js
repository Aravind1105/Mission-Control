import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  getProductFamilySaga as action,
  getProductFamilySuccess as actionSuccess,
} from '../actions';

export function handlerGetProductFamily() {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch('/api/v1/product-families', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

function* handler({ payload }) {
  try {
    const response = yield call(handlerGetProductFamily, payload);
    if (response.status !== 200) {
      throw Error('error in saga');
    }
    const data = yield call([response, response.json]);
    yield put(actionSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* getProductFamilySaga() {
  yield takeLatest(action, handler);
}
