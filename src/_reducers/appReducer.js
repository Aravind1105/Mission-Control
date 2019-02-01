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
	startupPage: "HOME"
};

export default function APPZ (state = initialState, action = {}) {
	switch(action.type){
		case "HOME":
			return state;
		case "MAIN":
			return state;
		case "DASHBOARD":
			return state;
		case "FRIDGES":
			return state;
		case "ORGANIZATIONS":
			return state;
		case "USERS":
			return state;
		case "PRODUCTS":
			return state;
		case "TRANSACTIONS":
			return state;
		case "REPORTS":
			return state;
		case NOT_FOUND:
			return null;
		default:
			return state;
	}
};