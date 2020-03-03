import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProductsMainPage from './ProductsMainPage';

const ProductsScreen = () => (
  <Switch>
    <Route exact path="/products/list" component={ProductsMainPage} />
    <Redirect to="/products/list" />
  </Switch>
);

export default ProductsScreen;
