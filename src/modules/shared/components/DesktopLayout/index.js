import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Container, Menu } from 'semantic-ui-react';

import logoSmall from 'styling/assets/images/new_Menu_Logo.png';
import { getKiosksAlerts } from 'modules/kiosks/selectors';
import { getAllKiosks } from 'modules/kiosks/actions';
import { getUserType } from 'modules/authentication/selectors';
import Navigation from '../Navigation';
import UserProfileBar from '../UserProfileBar/';
// import LanguageSelect from '../LanguageSelect';
import AlertsList from '../AlertsList';
import './desktopLayout.less';
import { version } from '../../../../../package.json';
const DesktopLayout = ({
  children,
  isLoading,
  alerts,
  getAllKiosks,
  userType,
}) => {
  // TODO: The setting should be stored in the localstorage
  const [minimized, setMinimized] = useState(false);

  const handleClick = () => {
    setMinimized(!minimized);
  };

  useEffect(() => {
    if (!isLoading) getAllKiosks({ data: {} });
  }, []);

  return (
    <div className={`desktop-container${minimized ? ' minimized' : ''}`}>
      <Menu inverted vertical className="desktop-navigation" fixed="left">
        <div className="brand-logo">
          <img src={logoSmall} alt="logo" />
          <span>Livello</span>
        </div>
        <Navigation />
        <Menu.Item>
          <Checkbox
            toggle
            className="desktop-nav-toggle"
            checked={!minimized}
            onClick={handleClick}
          />
          <h5>Version: {version}</h5>
        </Menu.Item>
      </Menu>
      <div className="desktop-content">
        <Menu secondary fixed="top" className="desktop-navigation-secondary">
          <Menu.Menu position="right">
            <Menu.Item>
              <AlertsList alerts={alerts} />
            </Menu.Item>
            {/* <Menu.Item>
              <LanguageSelect />
            </Menu.Item> */}
            <Menu.Item>
              <UserProfileBar showName />
            </Menu.Item>
            <Menu.Item>
              <span className="user-type">{userType}</span>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Container>{children}</Container>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.kiosks.isLoading,
  alerts: getKiosksAlerts(state),
  userType: getUserType(state),
});

const mapDispatchToProps = {
  getAllKiosks,
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopLayout);
