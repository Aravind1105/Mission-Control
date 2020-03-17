import React, { Component } from 'react';
import { Responsive } from 'semantic-ui-react';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

class AuthedLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Responsive {...Responsive.onlyMobile} className="container-mobile">
          <MobileLayout>{children}</MobileLayout>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopLayout>{children}</DesktopLayout>
        </Responsive>
      </>
    );
  }
}

export default AuthedLayout;
