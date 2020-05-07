import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import TransactionsList from './TransactionsList';
// import TransactionDetail from './TransactionDetail';

const Transactions = () => (
  <Switch>
    <Route exact path="/transactions" component={TransactionsList} />
    {/* <Route exact path="/transactions/:id" component={TransactionDetail} /> */}
    <Redirect to="/transactions" />
  </Switch>
);

export default Transactions;
