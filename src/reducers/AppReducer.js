const initialState = {
	showLoader: false,
	message: {
		show: false,
		type: "info",
		title: "Info!",
		text: "This is an info message."
	},
	notifications: [],
	defaultStartupPage: "HOME"
};

export default (state = initialState, action = {}) => {
	switch(action.type){
		default:
			return state;
	}
};