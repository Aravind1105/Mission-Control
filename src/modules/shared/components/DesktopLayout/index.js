import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Container, Menu } from 'semantic-ui-react';

import logoSmall from 'styling/assets/images/logo-small.png';
import { getKiosksAlerts } from 'modules/kiosks/selectors';
import { getAllKiosks } from 'modules/kiosks/actions';
import Navigation from '../Navigation';
import UserProfileBar from '../UserProfileBar';
// import LanguageSelect from '../LanguageSelect';
// import AlertsList from '../AlertsList';
import './desktopLayout.less';

const pjson = require('../../../../../package.json');

const DesktopLayout = ({ children, isLoading, /* alerts, */ getAllKiosks }) => {
  // TODO: The setting should be stored in the localstorage
  const [minimized, setMinimized] = useState(false);

  const handleClick = () => {
    setMinimized(!minimized);
  };

  useEffect(() => {
    if (!isLoading) getAllKiosks();
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
        </Menu.Item>
        <Menu.Item>{`Ver: ${pjson.version || ''}`}</Menu.Item>
      </Menu>
      <div className="desktop-content">
        <Menu secondary fixed="top" className="desktop-navigation-secondary">
          <Menu.Menu position="right">
            {/* <Menu.Item>
              <AlertsList alerts={alerts} />
            </Menu.Item> */}
            {/* <Menu.Item>
              <LanguageSelect />
            </Menu.Item> */}
            <Menu.Item>
              <UserProfileBar showName />
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
});

const mapDispatchToProps = {
  getAllKiosks,
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopLayout);
