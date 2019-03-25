import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import UsersToolbar from './components/UsersToolbar';
import UsersContent from './components/UsersContent';

const UsersScreen = () => {
  return (
    <>
      <Route
        exact
        path="/users"
        render={() => (
          <>
            <UsersToolbar />
            <UsersContent />
          </>
        )}
      />
    </>
  );
};

export default UsersScreen;
