import React from 'react';
import { Route } from 'react-router-dom';
import UsersToolbar from './components/UsersToolbar';
import UsersContent from './components/UsersContent';

const Users = () => (
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

export default Users;
