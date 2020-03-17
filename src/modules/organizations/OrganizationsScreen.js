import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import OrganizationsToolbar from './components/OrganizationsToolbar';
import OrganizationsContent from './components/OrganizationsContent';
import OrganizationDetails from './components/OrganizationDetails';
import OrganizationsModal from './components/OrganizationModal';

const OrganizationsScreen = () => {
  return (
    <>
      <Route exact path="/organizations" render={() => <Redirect to="/organizations/list" />} />
      <Route
        path="/organizations/list"
        render={() => (
          <>
            <OrganizationsToolbar />
            <OrganizationsContent />
          </>
        )}
      />
      {/* <Route exact path="/organizations/edit/:id" render={() => <OrganizationsModal />} /> */}
      <Route exact path="/organizations/:slug/detail" render={() => <OrganizationDetails />} />
    </>
  );
};

export default withRouter(OrganizationsScreen);
