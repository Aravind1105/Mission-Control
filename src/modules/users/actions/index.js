import { createAction } from 'redux-actions';

// Saga actions
export const getUsers = createAction('@@saga/GET_USERS');
export const toggleUserRole = createAction('@@saga/TOGGLE_USER_ROLE');

// State actions
export const getUsersSuccess = createAction('@@state/GET_USERS_SUCCESS');
export const setActiveUser = createAction('@@state/SET_ACTIVE_USER');
export const updateUserById = createAction('@@state/UPDATE_USER_BY_ID');
