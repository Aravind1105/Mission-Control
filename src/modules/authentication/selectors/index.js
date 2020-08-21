import { createSelector } from 'reselect';

export const getUserState = state => state.user;

export const getAuth = createSelector(
  getUserState,
  userState => userState.auth,
);

export const getRoot = createSelector(getUserState, userState => Boolean(userState.root));

export const getUserType = createSelector(getUserState, userState => {
  if (userState.root) {
    return 'Super Admin';
  }
  return 'Admin';
});
