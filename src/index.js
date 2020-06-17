import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import reducers from './core/reducers';
import rootSaga from './core/sagas';

import App from './core/App';

const sagaMiddleware = createSagaMiddleware({});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
