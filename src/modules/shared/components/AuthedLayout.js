import React from 'react';
import { Responsive } from 'semantic-ui-react';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

const AuthedLayout = ({ children }) => (
  <>
    <Responsive {...Responsive.onlyMobile} className="container-mobile">
      <MobileLayout>{children}</MobileLayout>
    </Responsive>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <DesktopLayout>{children}</DesktopLayout>
    </Responsive>
  </>
);

export default AuthedLayout;
