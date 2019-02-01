const initialState = {
	fridgeList: []
};

export default (state = initialState, action = {}) => {

	if(typeof action.type === 'undefined') return;

	switch(action.type){
		case 'SET_FRIDGES': {
			return { ...state, ...{fridgeList: action.payload}}
		}

		default:
			return state;
	}
};
