import React from 'react';
import { Route } from 'react-router-dom';
import UsersContent from './components/UsersContent';
import UserEdit from './components/UserEdit';
import UserLog from './components/UserLog';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const Users = () => (
  <>
    <SemanticToastContainer position='top-right' />
    <Route
      exact
      path="/users"
      render={() => <UsersContent />}
    />
    <Route exact path="/users/edit/:id" component={UserEdit} />
    <Route path="/users/log/:id" exact component={UserLog} />
  </>
);

export default Users;
