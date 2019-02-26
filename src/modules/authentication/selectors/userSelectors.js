import { createSelector } from 'reselect';

export const getUserState = state => state.user;

export const getAuth = createSelector(
  [getUserState],
  userState => userState.auth,
);
