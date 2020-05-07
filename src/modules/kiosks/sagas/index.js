import { all, fork } from 'redux-saga/effects';

import { handleReset, handleOpen } from './kiosksSaga';
import loadKiosksSaga from './loadKiosks';
import modifyLoadCellSaga from './modifyLoadCell';
import modifyKioskSaga from './modifyKiosk';
import getKioskSaga from './getKiosk';

export default function* kiosksSaga() {
  yield all([
    fork(loadKiosksSaga),
    fork(handleReset),
    fork(handleOpen),
    fork(modifyLoadCellSaga),
    fork(modifyKioskSaga),
    fork(getKioskSaga),
  ]);
}
