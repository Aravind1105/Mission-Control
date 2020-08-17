import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import TransactionsList from './TransactionsList';
// import TransactionDetail from './TransactionDetail';
import ReplenisherList from './ReplenisherList';
import NavSwitcher from '../shared/components/NavSwitcher';

import './styles.less';

const navSwitcherConfig = [
  { name: 'transactions ', goTo: '' },
  { name: 'sales', goTo: '/transactions/sales' },
  { name: 'refills', goTo: '/transactions/refills' },
];

const Transactions = () => (
  <>
    <Segment>
      <NavSwitcher config={navSwitcherConfig} />
      <Switch>
        <Route exact path="/transactions/sales" component={TransactionsList} />
        <Route exact path="/transactions/refills" component={ReplenisherList} />
        {/* <Route exact path="/transactions/:id" component={TransactionDetail} /> */}
        <Redirect to="/transactions/sales" />
      </Switch>
    </Segment>
  </>
);

export default Transactions;
