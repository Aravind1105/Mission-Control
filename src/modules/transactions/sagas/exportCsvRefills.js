import { call, takeLatest } from 'redux-saga/effects';

import ls from 'lib/localStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { exportCsvRefills as action } from '../actions';

export function handlerGetProduct(payload) {
  let link;
  const dateFrom = 1420070400000;
  const dateTo = Math.round(new Date());
  if (isNaN(payload.to) && isNaN(payload.from)) {
    link = `/api/v1/transactions/refills-csv/export/${dateFrom}/${dateTo}`;
  } else if (!isNaN(payload.to) && !isNaN(payload.from)) {
    link = `/api/v1/transactions/refills-csv/export/${payload.from}/${payload.to}`;
  } else if (isNaN(payload.to)) {
    link = `/api/v1/transactions/refills-csv/export/${payload.from}/${dateTo}`;
  }

  const token = ls.getItem(TOKEN_STORAGE_KEY);

  fetch(link, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: payload.kiosk.length > 0
      ? JSON.stringify({ kioskId: payload.kiosk })
      : JSON.stringify({}),
  })
    .catch(e => {
      return e;
    })
    .then(response => {
      if (response.status != 201) {
        alert('Etwas ist schief gelaufen. Versuche Sie es später noch einmal.');
      } else
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let element = document.createElement('a');
          element.href = url;
          element.download = `refills_${Date.now()}.csv`;
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
