import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ name, icon, path, mobileNavToggle }) => {
  const pathTo = Array.isArray(path) ? path[0] : path;
  return (
    <Menu.Item
      exact={pathTo === '/'}
      as={NavLink}
      to={pathTo}
      key={name}
      onClick={mobileNavToggle}
    >
      <Icon name={icon} className="left" />
      {name}
    </Menu.Item>
  );
};

export default NavigationItem;
