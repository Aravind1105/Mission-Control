import { createAction } from 'redux-actions';

// Saga actions
export const USERS_SAGA_LOAD = '@@saga/USERS_LOAD';
export const loadUsersSaga = createAction(USERS_SAGA_LOAD);

export const USERS_SAGA_SET_ROOT = '@@saga/USERS_SET_ROOT';
export const setRootUsersSaga = createAction(USERS_SAGA_SET_ROOT);

// State actions
export const USERS_STATE_UPDATE = '@@state/USERS_UPDATE';
export const updateUsers = createAction(USERS_STATE_UPDATE);

export const USERS_STATE_UPDATE_BY_ID = '@@state/UPDATE_BY_ID';
export const updateUserById = createAction(USERS_STATE_UPDATE_BY_ID);
