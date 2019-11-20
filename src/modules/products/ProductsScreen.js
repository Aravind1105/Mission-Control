import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import ProductsToolbar from './components/ProductsToolbar';
import ProductsContent from './components/ProductsContent';

const ProductsScreen = () => {
  return (
    <>
      <Route exact path="/products" render={() => <Redirect to="/products/list" />} />
      <Route
        path="/products/list"
        render={() => (
          <>
            {/* <ProductsToolbar /> */}
            <ProductsContent />
          </>
        )}
      />
    </>
  );
};

export default withRouter(ProductsScreen);
