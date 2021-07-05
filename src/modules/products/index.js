import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import PriceHistory from './PriceHistory';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { Segment } from 'semantic-ui-react';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const ProductsScreen = () => (
  <>
    <Segment>
      <SemanticToastContainer position="top-right" />
      <Switch>
        <Route exact path="/products/list" component={ProductsList} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route
          exact
          path="/products/:id/priceHistory"
          component={PriceHistory}
        />
        <Redirect to="/products/list" />
      </Switch>
    </Segment>
  </>
);

export default ProductsScreen;
