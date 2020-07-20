import { createSelector } from 'reselect';
import LivelloLS from 'lib/localStorage';
import { IS_AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../constants';
import { auth } from '../sagas/authenticate';

export const getUserState = state => state.user;

export const getAuth = createSelector(getUserState, userState => {
  let isHasRole =
    userState.rolesInOrganizations &&
    userState.rolesInOrganizations.some(
      elem => elem.role === 'admin' || elem.role === 'root',
    );
  if (userState.auth && !isHasRole) {
    LivelloLS.removeItem(IS_AUTH_STORAGE_KEY);
    LivelloLS.removeItem(TOKEN_STORAGE_KEY);
    auth.logout();
  }
  return userState.auth && isHasRole;
});

export const getRoot = createSelector(
  getUserState,
  userState => !!userState.root,
);
