import { NOT_FOUND } from "redux-first-router";
import Auth from '../Auth/Auth';

const auth = new Auth();

const initialState = {
	showLoader: false,
	message: {
		show: false,
		type: "info",
		title: "Info!",
		text: "This is an info message."
	},
	auth,
	notifications: [],
	defaultStartupPage: "HOME"
};

export default (state = initialState, action = {}) => {
	switch(action.type){
		case "HOME":
			return state;
		case "MAIN":			
			return state;
		case "USERS":
			return state;
		case "PRODUCTS":
			return state;
		case NOT_FOUND:
			return null;
		default:
			return state;	
	}
};