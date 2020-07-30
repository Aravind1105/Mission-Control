import { call, put, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  exportCsv as action,
} from '../actions';

export function handlerGetProduct(payload) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  fetch(`/api/v1/transactions/csv/export/${payload.from}/${payload.to}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .catch(e => {
    alert(e);
    return e;
  })
  .then(response => {
    if(response.status != 200) {
      alert('Etwas ist schief gelaufen. Versuche Sie es später noch einmal.');
    }
    else response.blob().then(blob => {
      let url = window.URL.createObjectURL(blob);
      let element = document.createElement('a');
      element.href = url;
      element.download = `transactions_${Date.now()}.csv`;
      // TODO: if document is empty alert the user
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      alert('Datei war erfolgreich heruntergeladen!');
    });
  });
}

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
