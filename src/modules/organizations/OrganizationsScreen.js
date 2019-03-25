import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import OrganizationsToolbar from './components/OrganizationsToolbar';
import OrganizationsContent from './components/OrganizationsContent';
import OrganizationDetails from './components/OrganizationDetails';
import OrganizationsForm from './components/OrganizationsForm';

const OrganizationsScreen = () => {
  return (
    <>
      <Route
        exact
        path="/organizations"
        render={() => (
          <>
            <OrganizationsToolbar />
            <OrganizationsContent />
          </>
        )}
      />
      <Route
        exact
        path="/organizations/add"
        render={() => <OrganizationsForm />}
      />
      <Route
        path="/organizations/edit/:id"
        render={() => <OrganizationsForm />}
      />
      <Route
        path="/organizations/organization/:id"
        render={() => <OrganizationDetails />}
      />
    </>
  );
};

export default withRouter(OrganizationsScreen);
