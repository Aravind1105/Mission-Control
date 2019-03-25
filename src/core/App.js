import React, { Component, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import history from 'lib/history';

import { CheckAuthentication } from './components';
import { AuthedLayout } from 'modules/shared/components';

import LoginScreen from 'modules/authentication/LoginScreen';

import routes from './router/routes';

import { initializeApp } from './actions/coreActions';
import { getInitialized } from './selectors/coreSelectors';

import '../styling/semantic.less';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => (
  <Dimmer active inverted>
    <Loader size="large">Loading</Loader>
  </Dimmer>
);

class App extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    const { initialized } = this.props;

    if (!initialized) return <Loading />;

    return (
      <Router history={history}>
        <CheckAuthentication>
          {isAuthenticated =>
            isAuthenticated ? (
              <AuthedLayout>
                <Suspense fallback={<Loading />}>
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

const mapStateToProps = state => ({
  initialized: getInitialized(state),
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch(initializeApp()),
});

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
