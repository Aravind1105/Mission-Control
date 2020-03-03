import { createSelector } from 'reselect';

export const getProducts = state => state.products.product;

export const getProductsSimpleList = createSelector([getProducts], products =>
  products.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })),
);
