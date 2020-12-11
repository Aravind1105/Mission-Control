import React from 'react';
import routes from 'core/router/routes';
import { connect } from 'react-redux';

import { getRoot } from 'modules/authentication/selectors';
import NavigationItem from './NavigationItem';

const Navigation = ({ mobileNavToggle, isRoot }) => {
  return (
    <>
      {routes.map(item => {
        let hasAccess = true;
        if (item.rootOnly && !isRoot) hasAccess = false;
        return hasAccess ? item.showOnMenu && (
          <NavigationItem
            {...item}
            mobileNavToggle={mobileNavToggle}
            key={item.name}
          />
        ) : null;
      })}
    </>
  );
};

const mapStateToProps = state => ({
  isRoot: getRoot(state),
});

export default connect(mapStateToProps)(Navigation);
