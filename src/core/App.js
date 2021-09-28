import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import history from 'lib/history';
import { AuthorizedLayout } from 'modules/shared/components';
import Loader from 'modules/shared/components/Loader';
import LoginScreen from 'modules/authentication/LoginScreen';
import { getAuth, getRoot } from 'modules/authentication/selectors';
import { logoutUserSaga } from 'modules/authentication/actions';
import { initializeApp } from './actions/coreActions';
import { getInitialized, getSessionExpired } from './selectors/coreSelectors';
import routes from './router/routes';
import ConfirmationModal from 'modules/shared/components/ConfirmationModal';
import '../styling/semantic.less';
import { updateUser } from '../modules/authentication/actions';

const App = ({
  initialized,
  isAuthenticated,
  initializeApp,
  isRoot,
  isExpired,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeApp();
  }, []);

  const redirectHandler = () => {
    dispatch(updateUser({ auth: false }));
  };

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
      {isExpired && (
        <ConfirmationModal
          title="Session Expired"
          isModalOpen={isExpired}
          confirmHandler={redirectHandler}
          sessionExpired={true}
        >
          <div style={{ textAlign: 'center', fontSize: '16px' }}>
            <p>Your session has expired.</p>{' '}
            <p>Log back in to start a new session!</p>
          </div>
        </ConfirmationModal>
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
  isExpired: getSessionExpired(state),
});

const mapDispatchToProps = { initializeApp, logoutUserSaga };

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
