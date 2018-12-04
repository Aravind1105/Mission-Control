
const routesMap = {
	HOME: {
		path: '/',
		//path: '/(list)?', // this should be the implementation of optional parameters
		thunk: async (dispatch, getState) => {
			console.info('##########################################################');
			console.log('-----------> 3 HOME thunk routesMap',getState());
			console.info('##########################################################');

		},
		role: ['admin','users']
		
		// ,
		// initialDispatch: false
	},

	MAIN: {
		path: '/main',
		//path: '/(list)?', // this should be the implementation of optional parameters
		thunk: async (dispatch, getState) => {
			console.info('##########################################################');
			console.log('-----------> MAIN page',getState());
			console.info('##########################################################');

		},
		role: ['admin','users']
		// ,
		// initialDispatch: false
	},

	CALENDER: {
		path: '/calender',
	}, 

	USERS: {
		path: '/users',
		
	}, 

	DASHBOARD: {
	 	path: '/dashboard',
	 	thunk: async (dispatch, getState) => {
	 		//let loc = getState();
	 		//console.log('--> ',loc);
	      //dispatch(accountsReadAccounts());
		}
	}
};

export default routesMap;