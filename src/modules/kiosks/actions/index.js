import { createAction } from 'redux-actions';

// Saga actions
export const getAllKiosks = createAction('@@saga/KIOSK_LOAD');
export const resetKiosk = createAction('@@saga/RESET_KIOSK');
export const modifyKiosk = createAction('@@saga/MODIFY_KIOSK');
export const modifyKioskLoadCell = createAction(
  '@@saga/MODIFY_KIOSK_LOAD_CELL',
);
export const getKiosk = createAction('@@saga/GET_KIOSK');
export const getAlertsGrid = createAction('@@saga/GET_ALERTS_GRID');
export const getProductLinesByOrgId = createAction(
  '@@saga/GET_PRODUCT_LINES_BY_ORG_ID',
);

// State actions
export const updateKiosks = createAction('@@state/KIOSKS_UPDATE');
export const updateKioskById = createAction('@@state/UPDATE_BY_ID');
export const modifyKioskSuccess = createAction('@@state/MODIFY_KIOSK_SUCCESS');
export const getKioskSuccess = createAction('@@state/GET_KIOSK_SUCCESS');
export const resetKioskSuccess = createAction('@@state/KIOSK_RESET_SUCCESS');
export const getAlertsGridSuccess = createAction(
  '@@state/GET_ALERTS_GRID_SUCCESS',
);
export const getProductLinesByOrgIdSuccess = createAction(
  '@@state/GET_PRODUCT_LINES_BY_ORG_ID_SUCCESS',
);
