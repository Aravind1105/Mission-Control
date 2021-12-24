import { handleActions, combineActions } from 'redux-actions';

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
  setPage,
  setPerPage,
  setSort,
  setFilters,
  setSearch,
  updateUser,
  resetUser,
} from '../actions';

const initialState = {
  list: [],
  activeUser: null,
  activeUserId: null,
  isLoading: false,
  userWithDetails: null,
  userLogs: {},
  pagination: {
    filters: { search: '' },
    sort: [
      {
        column: 'firstName',
        direction: 'ASC',
      },
    ],
    page: 0,
    perPage: 25,
    search: '',
  },
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
      activeUserId: payload,
      activeUser: state.list.find(el => el._id === payload),
    }),
    [resetUser]: state => ({
      ...state,
      userWithDetails: null,
    }),
    [combineActions(getOneUserWithInfo, updateUser)]: state => ({
      ...state,
      isLoading: true,
    }),
    [setOneUserWithInfo]: (state, { payload }) => ({
      ...state,
      userWithDetails: payload.user,
      isLoading: false,
    }),
    [getUserTransactions]: state => ({
      ...state,
      isLoading: true,
    }),
    [getUserTransactionsSuccess]: (state, { payload }) => ({
      ...state,
      userLogs: payload.userLogs,
      isLoading: false,
    }),
    [modifyUserMemberCard]: (state, { payload }) => ({ ...state, payload }),
    [toggleUserRole]: state => ({
      ...state,
      isLoading: true,
    }),
    [toggleUserRoleSuccess]: (state, { payload }) => {
      const list = state.list.map(el =>
        el._id === payload._id ? payload : el,
      );
      return {
        ...state,
        list,
        activeUser: payload,
        isLoading: false,
      };
    },
    [setPage]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, page: payload },
    }),
    [setPerPage]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, perPage: payload },
    }),
    [setSort]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, sort: payload },
    }),
    [setFilters]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, filters: payload },
    }),
    [setSearch]: (state, { payload }) => ({
      ...state,
      pagination: { ...state.pagination, search: payload },
    }),
  },
  initialState,
);

export default usersReducer;
