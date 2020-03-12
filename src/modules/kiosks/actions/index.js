import { createAction } from 'redux-actions';

// Saga actions
export const loadKiosksSaga = createAction('@@saga/KIOSK_LOAD');
export const resetKioskSaga = createAction('@@saga/KIOSKS_RESET');
export const openKioskSaga = createAction('@@saga/KIOSKS_OPEN');
export const modifyKiosk = createAction('@@saga/MODIFY_KIOSK');
export const modifyKioskLoadCell = createAction(
  '@@saga/MODIFY_KIOSK_LOAD_CELL',
);

// State actions
export const updateKiosks = createAction('@@state/KIOSKS_UPDATE');
export const updateKioskById = createAction('@@state/UPDATE_BY_ID');
