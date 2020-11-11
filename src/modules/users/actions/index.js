import { createAction } from 'redux-actions';

// Saga actions
export const getUsers = createAction('@@saga/GET_USERS');
export const toggleUserRole = createAction('@@saga/TOGGLE_USER_ROLE');
export const getOneUserWithInfo = createAction('@@saga/GET_ONE_USER_WITH_INFO');
export const getUserTransactions = createAction('@@saga/GET_USER_TRANSACTIONS');
export const modifyUserMemberCard = createAction('@@saga/MODIFY_USER_MEMBER_CARD');
export const updateUser = createAction('@@saga/UPDATE_USER');

// State actions
export const getUsersSuccess = createAction('@@state/GET_USERS_SUCCESS');
export const setActiveUser = createAction('@@state/SET_ACTIVE_USER');
export const toggleUserRoleSuccess = createAction('@@state/TOGGLE_USER_ROLE_SUCCESS');
export const setOneUserWithInfo = createAction('@@state//SET_ONE_USER_WITH_INFO');
export const getUserTransactionsSuccess = createAction('@@state//GET_USER_TRANSACTIONS_SUCCESS');
export const modifyUserMemberCardSuccess = createAction('@@state/MODIFY_USER_MEMBER_CARD_SUCCESS');
