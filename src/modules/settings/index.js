import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { connect } from 'react-redux';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import Security from './Security';
import General from './General';
import NavSwitcher from '../shared/components/NavSwitcher';
import Loader from '../shared/components/Loader';
import { getLoadingState } from './selectors';

const navSwitcherConfig = [
  { name: 'Settings' },
  { name: 'General', goTo: '/settings/general' },
  { name: 'Security', goTo: '/settings/security' },
];

const Settings = ({ isLoading }) => (
  <>
    {isLoading && <Loader />}
    <Segment>
      <SemanticToastContainer position='top-right' />
      <NavSwitcher config={navSwitcherConfig} />
      <Switch>
        <Route exact path="/settings/general" component={General} />
        <Route exact path="/settings/security" component={Security} />
        <Redirect to="/settings/security" />
      </Switch>
    </Segment>
  </>
);

const mapStateToProps = state => ({
  isLoading: getLoadingState(state),
});

export default connect(mapStateToProps)(Settings);
