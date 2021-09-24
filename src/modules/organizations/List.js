import React from 'react';

import Toolbar from './components/Toolbar';
import OrganizationsContent from './components/OrganizationsContent';
import './styles.less';

const OrganizationsList = () => (
  <>
    <Toolbar />
    <div className="org-table">
      <OrganizationsContent />
    </div>
  </>
);

export default OrganizationsList;
