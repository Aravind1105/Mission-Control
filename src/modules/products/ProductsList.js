import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Toolbar from './components/Toolbar';
import ProductsContent from './components/ProductsContent';
import {
  getManufacturers,
  setSearch as changeSearch,
  setCategory as changeCategory,
  setManufacturer as changeManufacturer,
} from './actions';
import {
  selectorGetProducts,
  getPaginationState,
  selectorGetManufacturer,
} from './selectors';

const ProductsList = ({
  products,
  isLoading,
  getManufacturers,
  changeSearch,
  changeCategory,
  changeManufacturer,
  manufacturersOptions,
  manufacturers,
  paginationState,
  ...props
}) => {
  const { search, manufacturer } = paginationState;
  useEffect(() => {
    if (manufacturers.length === 0) getManufacturers();
  }, [manufacturers]);

  return (
    <>
      <Toolbar
        search={search}
        manufacturer={manufacturer}
        changeSearch={changeSearch}
        changeCategory={changeCategory}
        changeManufacturer={changeManufacturer}
        manufacturerOptions={manufacturersOptions}
      />
      <ProductsContent
        {...props}
        products={products}
        isLoading={isLoading}
        paginationState={paginationState}
      />
    </>
  );
};

const mapStateToProps = state => ({
  products: selectorGetProducts(state),
  isLoading: state.products.isLoading,
  paginationState: getPaginationState(state),
  manufacturersOptions: selectorGetManufacturer(state),
  manufacturers: state.products.manufacturers,
});

const mapDispatchToProps = {
  getManufacturers,
  changeSearch,
  changeCategory,
  changeManufacturer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
