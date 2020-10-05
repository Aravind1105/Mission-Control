import { createSelector } from 'reselect';
import get from 'lodash/get';
import pick from 'lodash/pick';

export const getUsersListState = state => state.users.list;

export const getActiveUserState = state => state.users.activeUser;

export const getUserWithDetails = state => state.users.userWithDetails;

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

export const userInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  notes: '',
  mobile: '',
  id: '',
  userCards: [],
  orgId: [],
  paymentMethods: [],
};

export const getUserInitValues = createSelector(getUserWithDetails, user => {
  return user
    ? {
        id: user._id,
        ...pick(user, ['firstName', 'lastName', 'email']),
        notes: get(user, 'notes', '') || '',
        mobile: get(user, 'mobile', '') || '',
        paymentMethods: user.paymentMethods,
        userCards: user.membercards ? user.membercards : [],
        orgId: [],
      }
    : userInitialValues;
});

export const getMemberCardsAsOptions = createSelector(
  getUserWithDetails,
  user => {
    return user
      ? user.membercards.map(el => ({
          key: el,
          value: el,
          text: el,
        }))
      : [];
  },
);
