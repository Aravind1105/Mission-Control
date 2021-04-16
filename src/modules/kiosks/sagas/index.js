import { all, fork } from 'redux-saga/effects';

import resetKiosk from './resetKiosk';
import getAllKiosks from './getAllKiosks';
import getAllKiosksForTable from './getAllKiosksForTable';
import modifyLoadCellSaga from './modifyLoadCell';
import modifyKioskSaga from './modifyKiosk';
import getKioskSaga from './getKiosk';
import getAlertsGrid from './getAlertsGrid';
import getOrgData from './getOrgData';
import getProductLinesByOrgId from './getProductLinesByOrgId';
import getAlmostEmptyKiosks from './getAlmostEmptyKiosks';
import getTemperatureLogs from './getTemperatureLogs';
import getActivityLogs from './getActivityLogs';
import updateKioskProps from './updateKioskProps';
import setPlanogramSwitchState from './updatePlanogramSwitch';
import deleteLoadCell from './deleteLoadCell';
import updatePlayList from './updatePlaylist';
import deletePlayList from './deletePlaylist';
import exportCsvOrderList from './exportCsvOrders';
import exportCsvPackList from './exportCsvPacks';
export default function* kiosksSaga() {
  yield all([
    fork(getAllKiosks),
    fork(resetKiosk),
    fork(modifyLoadCellSaga),
    fork(modifyKioskSaga),
    fork(getKioskSaga),
    fork(getAlertsGrid),
    fork(getOrgData),
    fork(getProductLinesByOrgId),
    fork(getAlmostEmptyKiosks),
    fork(getTemperatureLogs),
    fork(getActivityLogs),
    fork(getAllKiosksForTable),
    fork(updateKioskProps),
    fork(setPlanogramSwitchState),
  ]);
}
