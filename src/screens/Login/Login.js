// import external modules
import React from "react";
import { connect } from "react-redux";

import Auth from '../../Auth/Auth';


import LoginPanel from "../../components/loginPanel/loginPanel";
import Footer from "../../components/footer/footer";
import "../../assets/scss/layouts/loginLayout.scss";


class LoginPage extends React.Component {

	constructor(props){
		super(props);
		this.auth = new Auth();
	}

	render() {
		return (
			<div className="login-layout">
				<LoginPanel onLogin={this.auth.login} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps)(LoginPage);

