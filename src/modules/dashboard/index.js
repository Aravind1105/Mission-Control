import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import DashboardScreen from './Dashboard';
import AlmostEmptyScreen from './AlmostEmptyKiosksPage';
import AlertsScreen from './AlertsPage';

import './styles.less';

const Dashboard = () => (
  <Switch>
    <Route path="/" exact component={DashboardScreen} />
    <Route path="/dashboard/almostEmpty" exact component={AlmostEmptyScreen} />
    <Route path="/dashboard/alerts" exact component={AlertsScreen} />
    <Redirect to="/" />
  </Switch>
);

export default Dashboard;
