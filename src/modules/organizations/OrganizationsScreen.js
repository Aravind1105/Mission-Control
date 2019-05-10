import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import OrganizationsToolbar from './components/OrganizationsToolbar';
import OrganizationsContent from './components/OrganizationsContent';
import OrganizationDetails from './components/OrganizationDetails';
import OrganizationsModal from './components/OrganizationModal';

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
        path="/organizations/add/new"
        render={props => <OrganizationsModal open {...props} title="Add a new organization" />}
      />
      <Route path="/organizations/edit/:id" render={() => <OrganizationsModal />} />
      <Route path="/organizations/:slug" render={() => <OrganizationDetails />} />
    </>
  );
};

export default withRouter(OrganizationsScreen);
