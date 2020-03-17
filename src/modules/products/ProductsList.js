import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import { getProductListSaga } from './actions';

const ProductsMainPage = () => {
  const [search, changeSearch] = useState('');
  const [category, changeCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListSaga());
  }, []);

  return (
    <>
      <Toolbar changeSearch={changeSearch} changeCategory={changeCategory} />
      <ProductsContent search={search} category={category} />
    </>
  );
};

export default ProductsMainPage;
