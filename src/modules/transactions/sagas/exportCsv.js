import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  exportCsv as action,
} from '../actions';

export function handlerGetProduct(payload) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch(`/api/v1/transactions/csv/export/${payload.from}/${payload.to}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.blob())
    .then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = `transactions_${Date.now()}.csv`;
      // TODO: if document is empty alert the user
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
};

function* handler({payload}) {
  try {
    yield call(handlerGetProduct,payload);
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
