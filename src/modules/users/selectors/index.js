import { createSelector } from 'reselect';

export const getUsersListState = state => state.users.list;

export const getActiveUserState = state => state.users.activeUser;

export const getActiveUserIDState = createSelector(getActiveUserState, user =>
  user ? user._id : '',
);

export const getUsersListForTable = createSelector(getUsersListState, users =>
  users.map(el => ({
    _id: el._id,
    name: `${el.firstName} ${el.lastName || ''}`,
    type: el.root ? 'Admin' : 'Consumer',
  })),
);

export const getTotalUsers = state => state.users.total;
