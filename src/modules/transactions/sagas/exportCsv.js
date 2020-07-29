import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  exportCsv as action,
  exportCsvSuccess as actionSuccess,
} from '../actions';

export function handlerGetProduct() {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  console.log('token:', token)
  return fetch(`/api/v1/transactions/csv/export/1578328700000/1578388700000`, {
//   fetch(`/api/v1/transactions/csv/export/1578328700000/1578388700000`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
//   .then((response) => {
//       console.log('response-0: ', response)
//     return response
//   });
}


function* handler({ payload }) {
  try {
    // const response = yield call(handlerGetProduct, payload);
    const response = yield call(handlerGetProduct);
    console.log('payload: ', payload)
    console.log('response-1: ', response)
    if (response.status !== 200) {
        throw Error('Error in saga');
    }
    // const data = yield call([response, response.json]);
    // const data = yield call(response, null);
    // console.log('data: ', data)
    yield put(actionSuccess({
        smth: response
    }));
    // console.log('response.body:', response.body)
    // yield put(actionSuccess(response));
  } catch (e) {
    console.log('Eeeeeeeeeeerror: ',e);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
