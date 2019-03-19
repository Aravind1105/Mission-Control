import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

import OrganizationsToolbar from './components/OrganizationsToolbar';
import OrganizationsContent from './components/OrganizationsContent';
import OrganizationDetails from './components/OrganizationDetails';
import OrganizationsForm from './components/OrganizationsForm';

const organizationData = {
  logoUrl:
    'https://upload.wikimedia.org/wikipedia/commons/d/de/Grey-Group-Logo.svg',
  name: 'Grey Global Group',
  street: 'Platz der Ideen 1',
  postal: '40476',
  city: 'Düsseldorf',
  taxID: '488972387',
  cm: 'Mr. Heinrich Heine',
  phone: '+49 (0)211 3807 365',
  mail: 'heinrich.heine@grey-group.com',
};

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
