import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  exportCsv as action,
  exportCsvSuccess as actionSuccess,
} from '../actions';

export function handlerGetProduct() {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch(`/api/v1/transactions/csv/export/1578328700000/1578388700000`, {
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
      // TODO: update file name.
      a.download = `statistic_${performance.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
};

function* handler() {
  try {
    yield call(handlerGetProduct);
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
