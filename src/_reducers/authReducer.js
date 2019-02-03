const initialState = {
	loggedIn: false,
	profile: {}
};

export default function APPZ (state = initialState, action = {}) {
	switch(action.type){
		case "AUTH_SET":
			return { ...state, ...{loggedIn: true,profile:action.payload}};
		case "AUTH_REMOVE":
			return { ...state, ...{loggedIn: false,profile:{}}};
		default:
			return state;
	}
};