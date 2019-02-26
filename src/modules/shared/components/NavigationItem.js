import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ name, icon, path, mobileNavToggle }) => {
  return (
    <Menu.Item
      exact={path === '/'}
      as={NavLink}
      to={path}
      key={name}
      onClick={mobileNavToggle}
    >
      <Icon name={icon} className="left" />
      {name}
    </Menu.Item>
  );
};

export default NavigationItem;
