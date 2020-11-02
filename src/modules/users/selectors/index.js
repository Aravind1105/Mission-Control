import { createSelector } from 'reselect';
import get from 'lodash/get';
import pick from 'lodash/pick';
import format from 'date-fns/format';

export const getUsersListState = state => state.users.list;

export const getActiveUserState = state => state.users.activeUser;

export const getUserWithDetails = state => state.users.userWithDetails;

export const getUserLogs = state => state.users.userTransactions;



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
  avatarUrl: '',
  status: '',
  root: false,
  address: '',
  email: '',
  notes: '',
  mobile: '',
  id: '',
  userCards: [],
  orgId: [],
  paymentMethods: [],
};

export const getActiveUserIDState = createSelector(getActiveUserState, user => {
  return user ? {
    id: user._id,
    ...pick(user, ['firstName', 'lastName', 'email', 'avatarUrl', 'status', 'address', 'root']),
    notes: get(user, 'notes', '') || '',
    mobile: get(user, 'mobile', '') || '',
    paymentMethods: user.paymentMethods ? user.paymentMethods.map((pMethod) => {
      return pMethod.provider
    }) : [],
    userCards: user.membercards ? user.membercards : [],
    org: user.rolesInOrganizations ? user.rolesInOrganizations.map((orgName) => {
      return orgName.organizationId.name
    }) : [],
  } : userInitialValues
})

export const getUserLogsState = createSelector(getUserLogs, log => {
  if (log !== undefined) {
    const logs = log.map((userLog) => {
      const date = format(new Date(userLog.created), 'dd-MM-yyyy HH:mm:ss')
      return {
        date: date,
        event: {
          session: userLog.session && userLog.session.kiosk && userLog.session.kiosk.name,
          productsTaken: userLog.itemsPurchased && userLog.itemsPurchased.map((items) => {
            return {
              price: items.price && items.price,
              prodId: items.productLine && items.productLine._id,
              name: items.productLine && items.productLine.name
            }
          }),
          paymentMethod: userLog.paymentMethod && userLog.paymentMethod.map(payment => {
            return {
              isPaid: payment.isPaid && payment.isPaid,
              memberId: payment.membercardId && payment.membercardId,
              stripeId: payment.stripeCustomerId && payment.stripeCustomerId,
              total: payment.amount && payment.amount
            }
          }),
          touchedScales: userLog.session && userLog.session.details && userLog.session.details.touchedArticles.map(scl => {
            return {
              id: scl.id && scl.id,
              weight: scl.val && scl.val
            }
          })
        }
      }
    })
    return logs;
  }
})

export const getUserInitValues = createSelector(getUserWithDetails, user => {
  return user
    ? {
      id: user._id,
      ...pick(user, ['firstName', 'lastName', 'email']),
      notes: get(user, 'notes', '') || '',
      mobile: get(user, 'mobile', '') || '',
      paymentMethods: user.paymentMethods,
      userCards: user.membercards ? user.membercards : [],
      org: [],
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
