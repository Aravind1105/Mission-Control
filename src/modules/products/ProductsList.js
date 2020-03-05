import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import { loadProductsSaga } from './actions';

const ProductsMainPage = () => {
  const [search, changeSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsSaga());
  }, []);

  return (
    <>
      <Toolbar changeSearch={changeSearch} />
      <ProductsContent search={search} />
    </>
  );
};

export default ProductsMainPage;
