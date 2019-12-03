import React from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import ProductsMainPage from './ProductsMainPage';

export default class ProductsScreen extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/products" render={() => <Redirect to="/products/list" />} />
        <Route path="/products/list" component={ProductsMainPage} />
      </Switch>

    );
  }
}

