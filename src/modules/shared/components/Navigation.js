import React from 'react';
import routes from 'core/router/routes';
import NavigationItem from './NavigationItem';

const Navigation = ({ mobileNavToggle }) => {
  return (
    <>
      {routes.map(item => (
        <NavigationItem
          {...item}
          mobileNavToggle={mobileNavToggle}
          key={item.name}
        />
      ))}
    </>
  );
};

export default Navigation;
