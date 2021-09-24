import React, { useState, useEffect } from 'react';
import { Container, Icon, Menu, Sidebar } from 'semantic-ui-react';
import Navigation from './Navigation';
import UserProfileBar from './UserProfileBar';
import logoSmall from '../../../styling/assets/images/new_Menu_Logo.png';
import { connect } from 'react-redux';
import { getKiosksList } from '../../kiosks/actions';

import './mobileLayout.less';

const MobileLayout = ({ children, kiosks, getKiosksList }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (kiosks.length === 0) getKiosksList();
  }, [kiosks]);

  return (
    <>
      <Menu secondary fixed="top" className="mobile-menu">
        <Menu.Item className="brand-logo">
          <img src={logoSmall} style={{ height: 26, width: 'auto' }} />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <UserProfileBar />
          </Menu.Item>
          <Menu.Item onClick={() => setVisible(!visible)}>
            <Icon name="bars" size="large" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          vertical
          visible={visible}
          width="wide"
          direction="right"
        >
          <Navigation mobileNavToggle={() => setVisible(false)} />
        </Sidebar>

        <Sidebar.Pusher dimmed={visible}>
          <Container className="mobile-content">{children}</Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

const mapStateToProps = state => ({
  kiosks: state.kiosks.kiosksList,
});

const mapDispatchToProps = {
  getKiosksList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileLayout);
