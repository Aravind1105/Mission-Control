import { createSelector } from 'reselect';
import get from 'lodash/get';
import pick from 'lodash/pick';
import format from 'date-fns/format';

const userLogMessages = {
  purchase: 'CONSUMER APP',
  refill: 'REFILL',
  terminal_purchase: 'TERMINAL',
  member_purchase: 'MEMBER CARD',
};

export const getUsersListState = state => state.users.list;

export const getActiveUserState = state => state.users.activeUser;

export const getUserWithDetails = state => state.users.userWithDetails;

export const getTotalUserLogs = state => state.users.userLogs.total;

export const getUserLogs = state => state.users.userLogs.data;

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
  rolesInOrg: [],
  paymentMethods: [],
};

export const getActiveUserIDState = createSelector(getActiveUserState, user => {
  return user
    ? {
        id: user._id,
        ...pick(user, [
          'firstName',
          'lastName',
          'email',
          'avatarUrl',
          'status',
          'address',
          'root',
        ]),
        updated: user.updated && format(new Date(user.updated), 'dd-MM-yyyy'),
        note: get(user, 'note', '') || '',
        mobile: get(user, 'mobile', '') || '',
        paymentMethods: user.paymentMethods
          ? user.paymentMethods.map(pMethod => {
              return `${pMethod.provider[0].toUpperCase() +
                pMethod.provider.slice(1)}`;
            })
          : [],
        userCards: user.membercards ? user.membercards : [],
        rolesInOrg: user.rolesInOrganizations
          ? user.rolesInOrganizations.map(org => {
              return `${org.role[0].toUpperCase() + org.role.slice(1)}-${
                org.organizationId.name
              }`;
            })
          : [],
      }
    : userInitialValues;
});

export const getUserLogsState = createSelector(getUserLogs, log => {
  if (log !== undefined) {
    const logs = log.map(userLog => {
      const date = format(new Date(userLog.created), 'dd-MM-yyyy HH:mm:ss');
      return {
        created: date,
        event: {
          kiosk:
            userLog.session &&
            userLog.session.kiosk &&
            userLog.session.kiosk.name,
          type: userLog.session && userLogMessages[userLog.session.type],
          total: userLog.total && userLog.total,
          userName: userLog.userId && userLog.userId.firstName,
          productsTaken:
            userLog.itemsPurchased &&
            userLog.itemsPurchased.length > 0 &&
            userLog.itemsPurchased.map(items => {
              return {
                price: items.price && items.price,
                name: items.productLine && items.productLine.name,
                lc: items.loadCell && items.loadCell,
              };
            }),
          paymentMethod:
            userLog.paymentMethod &&
            userLog.paymentMethod.length > 0 &&
            userLog.paymentMethod.map(payment => {
              return {
                isPaid: payment.isPaid && payment.isPaid,
                memberId: payment.membercardId && payment.membercardId,
                stripeId: payment.stripeCustomerId && payment.stripeCustomerId,
              };
            }),
          touchedScales:
            userLog.session &&
            userLog.session.details &&
            userLog.session.details.touchedArticles.length > 0 &&
            userLog.session.details.touchedArticles.map(scl => {
              return {
                qty: scl.quantity && scl.quantity,
                name: scl.productLine && scl.productLine.name,
                price:
                  scl.productLine &&
                  scl.productLine.priceHistory &&
                  scl.productLine.priceHistory[0].price,
                // lc: scl.loadCell && scl.loadCell
              };
            }),
        },
      };
    });
    return logs;
  }
});

export const getUserInitValues = createSelector(getUserWithDetails, user => {
  return user
    ? {
        id: user._id,
        ...pick(user, ['firstName', 'lastName', 'email']),
        note: get(user, 'note', '') || '',
        mobile: get(user, 'mobile', '') || '',
        address: get(user, 'address'),
        paymentMethods: user.paymentMethods,
        membercards: user.membercards ? user.membercards : [],
        rolesInOrganizations: get(user, 'rolesInOrganizations'),
        orgId: user.rolesInOrganizations.map(ele => ele.organizationId._id),
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
