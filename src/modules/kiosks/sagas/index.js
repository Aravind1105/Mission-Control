import { all, fork } from 'redux-saga/effects';

import resetKiosk from './resetKiosk';
import loadKiosksSaga from './loadKiosks';
import modifyLoadCellSaga from './modifyLoadCell';
import modifyKioskSaga from './modifyKiosk';
import getKioskSaga from './getKiosk';
import refillKiosk from './refillKiosk';

export default function* kiosksSaga() {
  yield all([
    fork(loadKiosksSaga),
    fork(resetKiosk),
    fork(refillKiosk),
    fork(modifyLoadCellSaga),
    fork(modifyKioskSaga),
    fork(getKioskSaga),
  ]);
}
