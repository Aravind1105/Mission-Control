import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import routesMap from 'routesMap';
import routesMapOptions from 'routesMapOptions';
import * as reducers from '_reducers';
import * as actionCreators from '_actions';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default history => {
  const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, routesMapOptions);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware, thunk, logger);
  const enhancers = composeEnhancers(enhancer, middlewares);

  return createStore(rootReducer, enhancers);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose;
