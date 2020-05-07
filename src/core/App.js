import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import history from 'lib/history';
import { AuthorizedLayout } from 'modules/shared/components';
import Loader from 'modules/shared/components/Loader';
import LoginScreen from 'modules/authentication/LoginScreen';
import { getAuth, getRoot } from 'modules/authentication/selectors';
import routes from './router/routes';
import { initializeApp } from './actions/coreActions';
import { getInitialized } from './selectors/coreSelectors';

import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import '../styling/semantic.less';

const App = ({ initialized, isAuthenticated, initializeApp }) => {
  useEffect(() => {
    initializeApp();
  }, []);

  if (!initialized) return <Loader />;

  return (
    <Router history={history}>
      {isAuthenticated ? (
        <AuthorizedLayout>
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map(({ Component, name, path, pathOptions }) => (
                <Route
                  exact={(pathOptions && pathOptions.exact) || false}
                  path={path}
                  key={name}
                >
                  <Component />
                </Route>
              ))}
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </AuthorizedLayout>
      ) : (
        <Switch>
          <Route path="/imprint" component={LoginScreen} />
          <Route component={LoginScreen} />
        </Switch>
      )}
    </Router>
  );
};

App.propTypes = {
  initialized: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  initializeApp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  initialized: getInitialized(state),
  isAuthenticated: getAuth(state) && getRoot(state),
});

const mapDispatchToProps = { initializeApp };

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
