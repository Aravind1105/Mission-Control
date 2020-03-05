import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import history from 'lib/history';
import { AuthedLayout } from 'modules/shared/components';
import Loader from 'modules/shared/components/Loader';
import LoginScreen from 'modules/authentication/LoginScreen';
import { CheckAuthentication } from './components';
import routes from './router/routes';
import { initializeApp } from './actions/coreActions';
import { getInitialized } from './selectors/coreSelectors';

import '../styling/semantic.less';

class App extends React.Component {
  componentDidMount() {
    const { initApp } = this.props;
    initApp();
  }

  render() {
    const { initialized } = this.props;

    if (!initialized) return <Loader />;

    return (
      <Router history={history}>
        <CheckAuthentication>
          {isAuthenticated =>
            isAuthenticated ? (
              <AuthedLayout>
                <Suspense fallback={<Loader />}>
                  <Switch>
                    {routes.map(({ Component, name, path, pathOptions }) => {
                      return (
                        <Route
                          exact={(pathOptions && pathOptions.exact) || false}
                          path={path}
                          key={name}
                        >
                          <Component />
                        </Route>
                      );
                    })}
                    <Redirect to="/" />
                  </Switch>
                </Suspense>
              </AuthedLayout>
            ) : (
              <Switch>
                <Route path="/imprint" component={LoginScreen} />
                <Route component={LoginScreen} />
              </Switch>
            )
          }
        </CheckAuthentication>
      </Router>
    );
  }
}

App.propTypes = {
  initialized: PropTypes.bool.isRequired,
  initApp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  initialized: getInitialized(state),
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch(initializeApp()),
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
