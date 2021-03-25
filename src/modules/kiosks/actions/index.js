import { createAction } from 'redux-actions';

// Saga actions
export const getAllKiosks = createAction('@@saga/KIOSK_LOAD');
export const getAllKiosksForTable = createAction('@@saga/KIOSK_FOR_TABLE_LOAD');
export const getAlmostEmptyKiosks = createAction(
  '@@saga/ALMOST_EMPTY_KIOSKS_LOAD',
);
export const resetKiosk = createAction('@@saga/RESET_KIOSK');
export const modifyKiosk = createAction('@@saga/MODIFY_KIOSK');
export const updateKioskProps = createAction('@@saga/UPDATE_KIOSK_PROPS');
export const modifyKioskLoadCell = createAction(
  '@@saga/MODIFY_KIOSK_LOAD_CELL',
);
export const getKiosk = createAction('@@saga/GET_KIOSK');
export const getAlertsGrid = createAction('@@saga/GET_ALERTS_GRID');
export const getOrganizationById = createAction(
  '@@saga/GET_ORGANIZATION_BY_ID',
);
export const getProductLinesByOrgId = createAction(
  '@@saga/GET_PRODUCT_LINES_BY_ORG_ID',
);
export const getTemperatureLogs = createAction('@@saga/GET_TEMPERATURE_LOGS');
export const getActivityLogs = createAction('@@saga/GET_ACTIVITY_LOGS');
export const setPlanogramSwitchState = createAction(
  '@@saga/SET_PLANOGRAM_SWITCH_STATE',
);
export const deleteLoadCell = createAction('@@saga/DELETE_LOAD_CELL');

// State actions
export const updateKiosks = createAction('@@state/KIOSKS_UPDATE');
export const updateKiosksForTable = createAction(
  '@@state/KIOSKS_UPDATE_FOR_TABLE',
);
export const updateAlmostEmptyKiosks = createAction(
  '@@saga/ALMOST_EMPTY_KIOSKS_UPDATE',
);
export const updateKioskById = createAction('@@state/UPDATE_BY_ID');
export const modifyKioskSuccess = createAction('@@state/MODIFY_KIOSK_SUCCESS');
export const updateKioskPropsSuccess = createAction(
  '@@state/UPDATE_KIOSK_PROPS_SUCCESS',
);
export const updatePlayList = createAction('@@state/UPDATE_PLAYLIST');
export const updatePlayListSuccess = createAction(
  '@@state/update_PLAYLIST_SUCCESS',
);
export const deletePlayList = createAction('@@state/DELETE_PLAYLIST');
export const deletePlayListSuccess = createAction(
  '@@state/DELETE_PLAYLIST_SUCCESS',
);
export const getKioskSuccess = createAction('@@state/GET_KIOSK_SUCCESS');
export const resetKioskSuccess = createAction('@@state/KIOSK_RESET_SUCCESS');
export const getAlertsGridSuccess = createAction(
  '@@state/GET_ALERTS_GRID_SUCCESS',
);
export const getOrganizationByIdSuccess = createAction(
  '@@state/GET_ORGANIZATION_BY_ID_SUCCESS',
);
export const getProductLinesByOrgIdSuccess = createAction(
  '@@state/GET_PRODUCT_LINES_BY_ORG_ID_SUCCESS',
);
export const getTemperatureLogsSuccess = createAction(
  '@@state/GET_TEMPERATURE_LOGS_SUCCESS',
);
export const getActivityLogsSuccess = createAction(
  '@@state/GET_ACTIVITY_LOGS_SUCCESS',
);
export const setPlanogramSwitchStateSuccess = createAction(
  '@@state/SET_PLANOGRAM_SWITCH_STATE',
);
export const deleteLoadCellSuccess = createAction(
  '@@saga/DELETE_LOAD_CELL_SUCCESS',
);

export const exportCsvOrderList = createAction('@@saga/GET_OrderList_CSV');
export const exportCsvPackList = createAction('@@saga/GET_PackList_CSV');
