import { createAction } from 'redux-actions';

// Saga actions
export const USERS_SAGA_LOAD = '@@saga/USERS_LOAD';
export const loadUsersSaga = createAction(USERS_SAGA_LOAD);

// State actions
export const USERS_STATE_UPDATE = '@@state/USERS_UPDATE';
export const updateUsers = createAction(USERS_STATE_UPDATE);
