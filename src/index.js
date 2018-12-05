/**
 * TO FORCE BOOTSTRAP.CSS TO LOAD BEFORE MAIN.CSS
 * PLACE BEFORE ANYTHING ELSE
 */
//import 'bootstrap/dist/css/bootstrap.css';
/**
 * REACT
 */
import React, { Suspense, lazy }  from 'react';
import ReactDOM from 'react-dom';

/**
 * OUR UTILS LIBRARY
 */
import Utils from 'inc/Utils';
/**
 * PWA
 */
// import registerServiceWorker from './registerServiceWorker';
/**
 * REDUX
 */
import { Provider } from  'react-redux';
import createHistory from 'history/createBrowserHistory'
import configureStore from 'configureStore';
/**
 * i18n
 * use <FormattedMessage id="xxx.yyy"/> when inside tags
 * and this.props.intl.formatMessage({id:'xxx.yyy'});
 */
import {addLocaleData, IntlProvider} from 'react-intl';

/**
 * CSS
 */
import "font-awesome/css/font-awesome.min.css";
import "./index.scss";
import Spinner from "./components/spinner/spinner";
/**
 * APP
 */
//import App from 'screens/App/App';
const App = lazy(() => import("./screens/App/App"));



/**
 * Deployment environment
 */
window.ENV = process.env.REACT_APP_ENV;
console.log(process.env.REACT_APP_ENV);
console.log(window.ENV);

const history = createHistory();

const store = configureStore(history);

const startApp = (lang, langFile) => {

	let dynLocaleData = require('react-intl/locale-data/'+lang);
	addLocaleData(dynLocaleData);

	let i18nConfig = {
		locale: lang,
		messages: langFile
	};

	// store.dispatch({
	// 	type: "SCREEN_CHANGE",
	// 	screen: {
	// 		page: 'loginUsername'
	// 	}
	// });

	const Wrapper = () => {
		return (
			<IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages} >
				<Provider store={store}>
				<Suspense fallback={<Spinner />}>
					<App {...this.props}/>
				</Suspense>
				</Provider>
			</IntlProvider>
		);
	};

	ReactDOM.render(<Wrapper />, document.getElementById('root'));
	
};

const activateLanguageSuccess = (lang, langFile) => {
	startApp(lang, langFile)
};

window.changeLang = (lang) => {
	Utils.activateLanguage(lang, activateLanguageSuccess);
};

Utils.detectLanguage(window.changeLang);

// remove the usage of Serviceworker for cache management
//registerServiceWorker();