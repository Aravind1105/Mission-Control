import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const ProductsScreen = () => (
  <>
  <SemanticToastContainer position='top-right'/>
  <Switch>
    <Route exact path="/products/list" component={ProductsList} />
    <Route exact path="/products/:id" component={ProductDetail} />
    <Redirect to="/products/list" />
  </Switch>
  </>
);

export default ProductsScreen;
