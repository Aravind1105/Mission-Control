import { createAction } from 'redux-actions';

// Saga actions
export const USER_SAGA_AUTHENTICATE = '@@saga/USER_AUTHENTICATE';
export const authenticateUserSaga = createAction(USER_SAGA_AUTHENTICATE);

export const USER_SAGA_HANDLE_AUTH = '@@saga/USER_HANDLE_AUTH';
export const handleAuthUserSaga = createAction(USER_SAGA_HANDLE_AUTH);

export const USER_SAGA_RENEW_SESSION = '@@saga/USER_RENEW_SESSION';
export const renewSessionUserSaga = createAction(USER_SAGA_RENEW_SESSION);

export const USER_SAGA_LOGOUT = '@@saga/USER_LOGOUT';
export const logoutUserSaga = createAction(USER_SAGA_LOGOUT);

// State actions
export const USER_STATE_UPDATE = '@@state/USER_UPDATE';
export const updateUser = createAction(USER_STATE_UPDATE);
