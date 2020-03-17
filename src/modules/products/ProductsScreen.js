import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import ProductsToolbar from './components/ProductsToolbar';
import ProductsContent from './components/ProductsContent';

const ProductsScreen = () => {
  return (
    <>
      <Route
        exact
        path="/products"
        render={() => (
          <>
            <ProductsToolbar />
            <ProductsContent />
          </>
        )}
      />
    </>
  );
};

export default ProductsScreen;
