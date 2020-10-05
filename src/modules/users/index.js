import React from 'react';
import { Route } from 'react-router-dom';
import UsersToolbar from './components/UsersToolbar';
import UsersContent from './components/UsersContent';
import UserEdit from './components/UserEdit';

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
    <Route exact path="/users/edit/:id" component={UserEdit} />
  </>
);

export default Users;
