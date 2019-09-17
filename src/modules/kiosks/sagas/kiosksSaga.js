import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import LivelloLS from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import {
  KIOSK_SAGA_LOAD,
  updateKiosks,
  KIOSKS_SAGA_RESET,
  updateKioskById,
  KIOSKS_SAGA_OPEN,
} from '../actions/kioskActions';

function* loadKiosks() {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, '/api/v1/kiosks/mc', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = yield call([response, response.json]);

  yield put(updateKiosks(data));
}

function* reset(action) {
  const token = LivelloLS.getItem(TOKEN_STORAGE_KEY);
  const response = yield call(fetch, `/api/v1/kiosks/${action.payload._id}/reset`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

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

function* handleReset() {
  yield takeEvery(KIOSKS_SAGA_RESET, reset);
}

function* handleOpen() {
  yield takeEvery(KIOSKS_SAGA_OPEN, open);
}

function* handleLoadKiosks() {
  yield takeEvery(KIOSK_SAGA_LOAD, loadKiosks);
}

export default function* kiosksSaga() {
  yield all([handleLoadKiosks(), handleReset(), handleOpen()]);
}
