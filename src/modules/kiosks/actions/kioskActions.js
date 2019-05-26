import { createAction } from 'redux-actions';

// Saga actions
export const KIOSK_SAGA_LOAD = '@@saga/KIOSK_LOAD';
export const loadKiosksSaga = createAction(KIOSK_SAGA_LOAD);

export const KIOSKS_SAGA_RESET = '@@saga/KIOSKS_RESET';
export const resetKioskSaga = createAction(KIOSKS_SAGA_RESET);

// State actions
export const KIOSKS_STATE_UPDATE = '@@state/KIOSKS_UPDATE';
export const updateKiosks = createAction(KIOSKS_STATE_UPDATE);

export const KIOSKS_STATE_UPDATE_BY_ID = '@@state/UPDATE_BY_ID';
export const updateKioskById = createAction(KIOSKS_STATE_UPDATE_BY_ID);
