import { call, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { exportCsvProducts as action } from '../actions';

export function handlerGetProduct(payload) {
  let link;
  if (payload.kiosk) {
    link = `/api/v1/transactions/products-csv/export/${payload.from}/${payload.to}?kioskId=${payload.kiosk}`;
  } else {
    link = `/api/v1/transactions/products-csv/export/${payload.from}/${payload.to}`;
  }
  const token = ls.getItem(TOKEN_STORAGE_KEY);

  fetch(link, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch(e => {
      return e;
    })
    .then(response => {
      if (response.status != 200) {
        alert('Etwas ist schief gelaufen. Versuche Sie es später noch einmal.');
      } else
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let element = document.createElement('a');
          element.href = url;
          element.download = `products_${Date.now()}.csv`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
    });
}

function* handler({ payload }) {
  try {
    yield call(handlerGetProduct, payload);
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
