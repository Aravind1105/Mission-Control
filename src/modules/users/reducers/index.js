import { handleActions } from 'redux-actions';

import {
  getUsers,
  getUsersSuccess,
  setActiveUser,
  updateUserById,
  setOneUserWithInfo,
  modifyUserMemberCard,
} from '../actions';

const initialState = {
  list: [],
  activeUser: null,
  isLoading: false,
  userWithDetails: null,
};

const usersReducer = handleActions(
  {
    [getUsers]: state => ({
      ...state,
      isListLoading: true,
    }),
    [getUsersSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.list,
      total: payload.total,
      isListLoading: false,
    }),
    [setActiveUser]: (state, { payload }) => ({
      ...state,
      activeUser: state.list.find(el => el._id === payload),
    }),
    [setOneUserWithInfo]: (state, { payload }) => ({
      ...state,
      userWithDetails: payload.user,
    }),
    [modifyUserMemberCard]: (state, { payload }) => ({ ...state, payload }),
    [updateUserById]: (state, { payload }) => {
      const list = state.list.map(el =>
        el._id === payload._id ? payload : el,
      );
      return {
        ...state,
        list,
        activeUser: payload,
      };
    },
  },
  initialState,
);

export default usersReducer;
