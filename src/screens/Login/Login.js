// import external modules
import React from "react";
import { connect } from "react-redux";

import {
	authSetUserDetails,
	authRemoveUserDetails
} from '../../_actions';

import Auth from '../../Auth/Auth';


import LoginPanel from "../../components/loginPanel/loginPanel";
import Footer from "../../components/footer/footer";
import "../../assets/scss/layouts/loginLayout.scss";


class LoginPage extends React.Component {

	constructor(props){
		super(props);
		this.auth = new Auth();
	}

	onLoginSuccess(res){
		console.log('this is the success callback with res:', res);
	}

	onLoginError(res){
		console.log('this is the error callback with res:', res);
	}

	render() {
		return (
			<div className="login-layout">
				<LoginPanel onLogin={() => {
					let options = {
						success: this.onLoginSuccess,
						error: this.onLoginError
					};
					this.auth.login(options);
				}} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return ({
    dispatch,
    setUserDetails: (userDetails) => {
      dispatch(authSetUserDetails(userDetails));
    },
    removeUserDetails: () => {
      dispatch(authRemoveUserDetails());
    }
  });
};

export default connect(mapStateToProps)(LoginPage);

