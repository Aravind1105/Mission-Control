import React from 'react';

import Toolbar from './components/Toolbar';
import OrganizationsContent from './components/OrganizationsContent';
import './styles.less';

const OrganizationsList = () => (
  <>
    <Toolbar />
    <OrganizationsContent />
  </>
);

export default OrganizationsList;
