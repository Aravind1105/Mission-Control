/**
 * Central Action Types + Action Creators file
 * Best practives as per http://blog.jakoblind.no/redux-action-creator-best-practice/
 * Remember : "A user action should be an Action creator"
 */

/**
 * ==============================================
 * APP actions - global application actions
 * ==============================================
 */
export const APP_SHOW_LOADER = 'APP_SHOW_LOADER';

/**
 * Execute Application main ajax call
 * @param  {action} action [description]
 * @return {thunk} which will bring the result from the main app api call with several startup parameters
 */
export const appMainCall = (action) => {

	return (dispatch) => {

		// SHOW APP LOADER
		dispatch(appShowLoader());

		return true;
	}
};

/**
 * Show Application Preloader
 * @return {action}
 */
export const appShowLoader = (payload = true) => {
	return {
		type: APP_SHOW_LOADER,
		payload: payload
	}
};