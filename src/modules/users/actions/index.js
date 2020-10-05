import { createAction } from 'redux-actions';

// Saga actions
export const getUsers = createAction('@@saga/GET_USERS');
export const toggleUserRole = createAction('@@saga/TOGGLE_USER_ROLE');
export const getOneUserWithInfo = createAction('@@saga/GET_ONE_USER_WITH_INFO');
export const modifyUser = createAction('@@saga/MODIFY_USER');
export const modifyUserMemberCard = createAction(
  '@@saga/MODIFY_USER_MEMBER_CARD',
);

// State actions
export const getUsersSuccess = createAction('@@state/GET_USERS_SUCCESS');
export const setActiveUser = createAction('@@state/SET_ACTIVE_USER');
export const updateUserById = createAction('@@state/UPDATE_USER_BY_ID');
export const setOneUserWithInfo = createAction(
  '@@state//SET_ONE_USER_WITH_INFO',
);
export const modifyUserSuccess = createAction('@@state/MODIFY_USER_SUCCESS');
export const modifyUserMemberCardSuccess = createAction(
  '@@state/MODIFY_USER_MEMBER_CARD_SUCCESS',
);
