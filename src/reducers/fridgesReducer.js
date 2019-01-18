const initialState = {
	fridges: []
};

export default (state = initialState, action = {}) => {

	if(typeof action.type === 'undefined') return;

	switch(action.type){
		case 'SET_FRIDGES': {
			return { ...state, ...{fridges: action.payload}}
		}

		default:
			return state;
	}
};
