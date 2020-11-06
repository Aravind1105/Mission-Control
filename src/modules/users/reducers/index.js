import { handleActions } from 'redux-actions';

import {
  getUsers,
  getUsersSuccess,
  setActiveUser,
  toggleUserRole,
  toggleUserRoleSuccess,
  setOneUserWithInfo,
  getUserTransactionsSuccess,
  modifyUserMemberCard,
  getUserTransactions,
} from '../actions';

const initialState = {
  list: [],
  activeUser: null,
  isLoading: false,
  userWithDetails: null,
  userLogs: {}
};

const usersReducer = handleActions(
  {
    [getUsers]: state => ({
      ...state,
      isLoading: true,
    }),
    [getUsersSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.list,
      total: payload.total,
      isLoading: false,
    }),
    [setActiveUser]: (state, { payload }) => ({
      ...state,
      activeUser: state.list.find(el => el._id === payload),
    }),
    [setOneUserWithInfo]: (state, { payload }) => ({
      ...state,
      userWithDetails: payload.user,
    }),
    [getUserTransactions]: state => ({
      ...state,
      isLoading: true
    }),
    [getUserTransactionsSuccess]: (state, { payload }) => ({
      ...state,
      userLogs: payload.userLogs,
      isLoading: false
    }),
    [modifyUserMemberCard]: (state, { payload }) => ({ ...state, payload }),
    [toggleUserRole]: state => ({
      ...state,
      isLoading: true
    }),
    [toggleUserRoleSuccess]: (state, { payload }) => {
      const list = state.list.map(el =>
        el._id === payload._id ? payload : el,
      );
      return {
        ...state,
        list,
        activeUser: payload,
        isLoading: false

      };
    },
  },
  initialState,
);

export default usersReducer;
