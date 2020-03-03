import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ProductsToolbar from './components/ProductsToolbar';
import ProductsContent from './components/ProductsContent';
import { loadProductsSaga } from './actions/productActions';

const ProductsMainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsSaga());
  }, []);

  return (
    <>
      <ProductsToolbar />
      <ProductsContent />
    </>
  );
};

export default ProductsMainPage;
