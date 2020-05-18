import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  getProductSaga as action,
  getProductSuccess as actionSuccess,
} from '../actions';

export function handlerGetProduct(id) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch(`/api/v1/product-lines/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

function* handler({ payload }) {
  try {
    const response = yield call(handlerGetProduct, payload);
    if (response.status !== 200) {
      throw Error('error in saga');
    }
    const data = yield call([response, response.json]);
    yield put(actionSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* getProductSaga() {
  yield takeLatest(action, handler);
}
