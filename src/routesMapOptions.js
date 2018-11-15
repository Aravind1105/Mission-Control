// import { redirect } from 'redux-first-router';

// The purpose of the below options is to demonstrate auth filtering.
// onBeforeChange fires before going to a new route, and you can
// redirect if certian conditions aren't met.

import {appMainCall} from 'actions';

export default {
	onBeforeChange: (dispatch, getState, action) => {
		console.info('******** routesMapOptions FILTER onBeforeChange *************');
		console.info('******** VERIFY IF WE NEED TO DO THE 1st CALL *************');
		console.info(action);
		
		let st = getState();
		if(action.action.type !== "SERVER_ERROR" && typeof st.app.startupPage === 'undefined'){

			// This call needs to be done here, because it's triggererd for all routes if they are used as landing page
			// which means, if the user stored the bookmark for a screen
			
			dispatch(appMainCall(action));
		}
	},
	onAfterChange: (dispatch, getState) => {
		console.info('******** routesMapOptions FILTER onAfterChange *************');
		const st = getState();
		const { type } = st.location

		// GO TO STARTUP PAGE
		// if the router identifies the location as / (HOME)
		// means that we need to do the 1st main call and get from the api
		// the information about which is the startup page to show
		if(type==='HOME' && typeof st.app.startupPage !== 'undefined'){
			dispatch({
				type: st.app.startupPage
			});
		}
	}
}