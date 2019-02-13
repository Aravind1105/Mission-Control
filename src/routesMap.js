import { getProducts, getFridges, getOrganizations } from './_actions';

const routesMap = {
  HOME: {
    path: '/',
    //path: '/(list)?', // this should be the implementation of optional parameters
    thunk: async (dispatch, getState) => {
      console.info('##########################################################');
      console.log('-----------> 3 HOME thunk routesMap', getState());
      console.info('##########################################################');
    },
    role: ['admin', 'users'],

    // ,
    // initialDispatch: false
  },

<<<<<<< Updated upstream
  CALLBACK: {
    path: '/callback',
    thunk: async (dispatch, getState) => {
      //let loc = getState();
      //console.log('--> ',loc);
      //dispatch(accountsReadAccounts());
    },
=======
  MAIN: {
    path: '/main',
    //path: '/(list)?', // this should be the implementation of optional parameters
    thunk: async (dispatch, getState) => {
      console.info('##########################################################');
      console.log('-----------> MAIN page', getState());
      console.info('##########################################################');
    },
    role: ['admin', 'users'],
    // ,
    // initialDispatch: false
>>>>>>> Stashed changes
  },

  DASHBOARD: {
    path: '/dashboard',
    thunk: async (dispatch, getState) => {
<<<<<<< Updated upstream
      // let loc = getState();
      // console.log('--> ',loc);
=======
      //let loc = getState();
      //console.log('--> ',loc);
>>>>>>> Stashed changes
      //dispatch(accountsReadAccounts());
    },
  },

  FRIDGES: {
    path: '/fridges',
    thunk: async (dispatch, getState) => {
      dispatch(getFridges());
    },
  },

  ORGANIZATIONS: {
    path: '/organizations',
    thunk: async (dispatch, getState) => {
      dispatch(getOrganizations());
    },
  },

  USERS: {
    path: '/users',
  },

  PRODUCTS: {
    path: '/products',
    thunk: async (dispatch, getState) => {
      dispatch(getProducts());
    },
  },

  TRANSACTIONS: {
    path: '/transactions',
  },

  REPORTS: {
    path: '/reports',
  },

  STATISTICS: {
    path: '/stats',
  },
};

export default routesMap;
