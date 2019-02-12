// import external modules
import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// import internal(own) modules
import MainLayout from "../../components/mainLayout";
import Callback from "../Callback/Callback";
import Login from "../Login/Login";
import Products from "../Products/Products";
import Fridges from "../Fridges/Fridges";
import Organizations from '../Organizations/Organizations';

// CSS
import "react-perfect-scrollbar/dist/css/styles.css";

import Auth from '../../inc/Auth';

const auth = new Auth(window.CONFIG.auth);

//import views
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Users = lazy(() => import("../Users/Users"));

/**
 * i18n
 * use <FormattedMessage id="xxx.yyy"/> when inside tags
 * and this.props.intl.formatMessage({id:'xxx.yyy'});
 */


const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


class App extends Component {

	processMessage() {

	}

	render() {
		return (
			<div className="App">
			{{
				'HOME': (
					<Login auth0={auth}/>
				),
				'CALLBACK': (
					<MainLayout>
						<Callback />
					</MainLayout>
				),
				'DASHBOARD': (
					<MainLayout>
						<Dashboard auth0={auth}/>
					</MainLayout>
				),
				'FRIDGES':(
					<MainLayout>
						<Fridges/>
					</MainLayout>
				),
				'ORGANIZATIONS':(
					<MainLayout>
					<Organizations/>
					</MainLayout>
				),
				'USERS':(
					<MainLayout>
					<Users></Users>
					</MainLayout>
				),
				'PRODUCTS':(
					<MainLayout>
					<Products/>
					</MainLayout>
				),
				'TRANSACTIONS':(
					<MainLayout/>
				),
				'REPORTS':(
					<MainLayout/>
				),
				'STATISTICS':(
					<MainLayout/>
				),
				'@@redux-first-router/NOT_FOUND': (
					<div>Page not found.</div>
				)
			}[this.props.location.type]}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default injectIntl(connect(mapStateToProps)(App));