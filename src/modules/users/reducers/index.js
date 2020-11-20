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
  getOneUserWithInfo,
  changePage,
  changePerPage
} from '../actions';

const initialState = {
  list: [],
  activeUser: null,
  activeUserId: null,
  isLoading: false,
  userWithDetails: null,
  userLogs: {},
  page: 0,
  perPage: 25
};

const usersReducer = handleActions(
  {
    [changePage]: (state, { payload }) => ({
      ...state,
      page: payload
    }),
    [changePerPage]: (state, { payload }) => ({
      ...state,
      perPage: payload
    }),
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
      activeUserId: payload,
      activeUser: state.list.find(el => el._id === payload),
    }),
    [getOneUserWithInfo]: state => ({
      ...state,
      isLoading: true,
    }),
    [setOneUserWithInfo]: (state, { payload }) => ({
      ...state,
      userWithDetails: payload.user,
      isLoading: false
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
