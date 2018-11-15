
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
	// DASHBOARD: {
	// 	path: '/dashboard',
	// 	thunk: async (dispatch, getState) => {
	// 		let loc = getState();
	// 		console.log('--> ',loc);
	//      dispatch(accountsReadAccounts());
	// 	}
	// },
};

export default routesMap;