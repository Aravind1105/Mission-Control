import { all, fork } from 'redux-saga/effects';

import resetKiosk from './resetKiosk';
import getAllKiosks from './getAllKiosks';
import modifyLoadCellSaga from './modifyLoadCell';
import modifyKioskSaga from './modifyKiosk';
import getKioskSaga from './getKiosk';
import getAlertsGrid from './getAlertsGrid';
import getOrgName from './getOrgName';
import getProductLinesByOrgId from './getProductLinesByOrgId';
import getAlmostEmptyKiosks from './getAlmostEmptyKiosks';

export default function* kiosksSaga() {
  yield all([
    fork(getAllKiosks),
    fork(resetKiosk),
    fork(modifyLoadCellSaga),
    fork(modifyKioskSaga),
    fork(getKioskSaga),
    fork(getAlertsGrid),
    fork(getOrgName),
    fork(getProductLinesByOrgId),
    fork(getAlmostEmptyKiosks),
  ]);
}
