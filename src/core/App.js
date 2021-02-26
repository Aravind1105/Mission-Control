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
import { logoutUserSaga } from 'modules/authentication/actions';
import { initializeApp } from './actions/coreActions';
import { getInitialized } from './selectors/coreSelectors';
import routes from './router/routes';

import '../styling/semantic.less';

const App = ({ initialized, isAuthenticated, initializeApp, isRoot }) => {
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
              {routes.map(
                ({ Component, name, path, rootOnly, pathOptions }) => {
                  let hasAccess = true;
                  if (rootOnly && !isRoot) hasAccess = false;
                  return hasAccess ? (
                    <Route
                      exact={Boolean(pathOptions && pathOptions.exact)}
                      path={path}
                      key={name}
                    >
                      <Component />
                    </Route>
                  ) : null;
                },
              )}
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
  isRoot: PropTypes.bool,
};

const mapStateToProps = state => ({
  initialized: getInitialized(state),
  isAuthenticated: getAuth(state),
  isRoot: getRoot(state),
});

const mapDispatchToProps = { initializeApp, logoutUserSaga };

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
