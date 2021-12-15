import { all, fork } from 'redux-saga/effects';

import resetKiosk from './resetKiosk';
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
import exportCsvTempLogs from './exportCsvTempLogs';
import getKiosksList from './getKiosksList';
import getOrgsList from './getOrganizationsList';
import getAllSerialNumbers from './getAllSerialNumbers';
import addSingleKiosk from './addSingleKiosk';
import addDoubleKiosk from './addDoubleKiosk';

export default function* kiosksSaga() {
  yield all([
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
    fork(deleteLoadCell),
    fork(exportCsvOrderList),
    fork(exportCsvPackList),
    fork(exportCsvTempLogs),
    fork(getKiosksList),
    fork(getOrgsList),
    fork(getAllSerialNumbers),
    fork(addSingleKiosk),
    fork(addDoubleKiosk),
  ]);
}
