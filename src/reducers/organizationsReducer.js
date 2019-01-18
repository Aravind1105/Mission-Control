const initialState = {
	organizations: []
};

export default (state = initialState, action = {}) => {

	if(typeof action.type === 'undefined') return;

	switch(action.type){
		case 'SET_ORGANIZATIONS': {
			return { ...state, ...{organizations: action.payload}}
		}

		default:
			return state;
	}
};
