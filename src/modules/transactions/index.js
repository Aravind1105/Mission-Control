import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import TransactionsList from './TransactionsList';
// import TransactionDetail from './TransactionDetail';
import ReplenisherList from './ReplenisherList';
import ProductList from './ProductList';
import NavSwitcher from '../shared/components/NavSwitcher';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import './styles.less';

const navSwitcherConfig = [
  { name: 'transactions' },
  { name: 'sales', goTo: '/transactions/sales' },
  { name: 'refills', goTo: '/transactions/refills' },
  { name: 'products', goTo: '/transactions/product' },
];

const Transactions = () => (
  <>
    <Segment>
      <SemanticToastContainer position="top-right" />
      <NavSwitcher config={navSwitcherConfig} />
      <Switch>
        <Route exact path="/transactions/sales" component={TransactionsList} />
        <Route exact path="/transactions/refills" component={ReplenisherList} />
        <Route exact path="/transactions/product" component={ProductList} />
        {/* <Route exact path="/transactions/:id" component={TransactionDetail} /> */}
        <Redirect to="/transactions/sales" />
      </Switch>
    </Segment>
  </>
);

export default Transactions;
