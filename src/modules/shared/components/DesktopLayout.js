import React, { useState } from 'react';
import { Checkbox, Container, Menu, Icon, Label } from 'semantic-ui-react';
import Navigation from './Navigation';
import UserProfileBar from './UserProfileBar';
import LanguageSelect from './LanguageSelect';

import logoSmall from '../../../styling/assets/images/logo-small.png';

import './desktopLayout.less';

const DesktopLayout = ({ children }) => {
  // TODO: The setting should be stored in the localstorage
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={`desktop-container${minimized ? ' minimized' : ''}`}>
      <Menu inverted vertical className="desktop-navigation" fixed="left">
        <div className="brand-logo">
          <img src={logoSmall} />
          <span>Livello</span>
        </div>
        <Navigation />
        <Menu.Item>
          <Checkbox
            toggle
            className="desktop-nav-toggle"
            checked={!minimized}
            onClick={() => setMinimized(!minimized)}
          />
        </Menu.Item>
      </Menu>
      <div className="desktop-content" style={{ backgroundColor: '#f4f7fa' }}>
        <Menu secondary fixed="top" className="desktop-navigation-secondary">
          <Menu.Menu position="right">
            <Menu.Item>
              <Icon
                name="bell outline"
                style={{
                  fontSize: '1.5em',
                }}
              />
              <Label
                color="red"
                floating
                className="alerts-navi"
                style={{
                  fontSize: '8px',
                  top: '1em',
                }}
              >
                22
              </Label>
            </Menu.Item>
            <Menu.Item>
              <LanguageSelect />
            </Menu.Item>
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

export default DesktopLayout;
