import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

import history from 'lib/history';
import './styles.less';

const NavSwitcher = ({ config }) => {
  const location = useLocation();
  const handleClick = (e, { value }) => {
    if (value) history.push(value);
  };
  return (
    <Menu tabular attached="top">
      {config.map(item => (
        <Menu.Item
          key={item.goTo}
          name={item.name}
          className={item.goTo ? '' : 'switcher-text'}
          onClick={handleClick}
          value={item.goTo}
          link
          active={location.pathname === item.goTo}
        />
      ))}
    </Menu>
  );
};

export default NavSwitcher;
