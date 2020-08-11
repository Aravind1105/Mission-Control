import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import DashboardScreen from './Dashboard';
import AlmostEmptyScreen from './AlmostEmptyKiosksPage';

import './styles.less';

const Dashboard = () => (
  <Switch>
    <Route path="/" exact component={DashboardScreen} />
    <Route path="/dashboard/almost-empty" exact component={AlmostEmptyScreen} />
    <Redirect to="/" />
  </Switch>
);

export default Dashboard;
