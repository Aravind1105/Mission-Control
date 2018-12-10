import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import { connectRoutes } from 'redux-first-router';

import routesMap from 'routesMap';
import routesFilter from 'routesMapOptions';
//import * as reducers from 'reducers';
import app from './reducers/AppReducer';
import productsReducer from './reducers/productsReducer';
import contactsReducer from "./reducers/contacts/";
import * as actionCreators from 'actions';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default history => {

	const {
		reducer,
		middleware,
		enhancer
	} = connectRoutes( history, routesMap, routesFilter );

	const rootReducer = combineReducers({ app, contactsReducer, productsReducer, location: reducer });
	const middlewares = applyMiddleware(middleware, thunk, logger);
	const enhancers = composeEnhancers(enhancer, middlewares);

	return createStore(rootReducer, enhancers);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) : compose ;