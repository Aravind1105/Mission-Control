import { call, put, takeEvery } from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { resetKioskSaga, updateKioskById, openKioskSaga } from '../actions';

function* reset(action) {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(
    fetch,
    `/api/v1/kiosks/${action.payload._id}/reset`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = yield call([response, response.json]);

  yield put(updateKioskById(data));
}

function* open(action) {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/sessions/trigger/refill', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ kioskId: action.payload._id }),
  });

  const data = yield call([response, response.json]);

  yield put(updateKioskById(data));
}

export function* handleReset() {
  yield takeEvery(resetKioskSaga, reset);
}

export function* handleOpen() {
  yield takeEvery(openKioskSaga, open);
}
