import { call, put, takeEvery } from 'redux-saga/effects';
import ls from 'lib/LocalStorage';
import { TOKEN_STORAGE_KEY } from 'modules/authentication/constants';
import { modifyKioskLoadCell, loadKiosksSaga } from '../actions';

function handlerRequest(payload, id) {
  const token = ls.getItem(TOKEN_STORAGE_KEY);
  return fetch(`/api/v1/kiosks/${id}/configLoadCells`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

function* handler({ payload: { kioskId, loadCellConfigs, callback } }) {
  const response = yield call(handlerRequest, { loadCellConfigs }, kioskId);
  const data = yield call([response, response.json]);

  if (!data.error) {
    yield put(loadKiosksSaga());
  }
  callback();
}

export default function* modifyLoadCellSaga() {
  yield takeEvery(modifyKioskLoadCell, handler);
}
