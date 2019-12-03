import React from 'react';
import { render } from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import reducers from './core/reducers';
import rootSaga from './core/sagas';

import App from './core/App';

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware({});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
