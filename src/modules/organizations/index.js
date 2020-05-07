import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import OrganizationsList from './List';
import OrganizationDetails from './Details';
import OrganizationEdit from './Edit';

import './styles.less';

const Organizations = () => (
  <Switch>
    <Route path="/organizations/list" exact component={OrganizationsList} />
    <Route
      path="/organizations/detail/:slug"
      exact
      component={OrganizationDetails}
    />
    <Route
      path={['/organizations/edit/:slug', '/organizations/create']}
      exact
      component={OrganizationEdit}
    />
    <Redirect to="/organizations/list" />
  </Switch>
);

export default Organizations;
