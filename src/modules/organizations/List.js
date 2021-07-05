import React from 'react';

import Toolbar from './components/Toolbar';
import OrganizationsContent from './components/OrganizationsContent';
import { Segment } from 'semantic-ui-react';

const OrganizationsList = () => (
  <>
    <Segment>
      <Toolbar />
      <OrganizationsContent />
    </Segment>
  </>
);

export default OrganizationsList;
