import { createSelector } from 'reselect';

export const getProducts = state => state.products.product;

export const getProductsHistory = createSelector(getProducts, products =>
  products.map(({ _id, priceHistory }) => ({ _id, priceHistory })),
);

export const getProductsWithFilter = searchText =>
  createSelector(getProducts, products => {
    const search = searchText.trim().toLowerCase();

    if (search) {
      return products.filter(
        ({ name = '', manufacturer = '', category = '' }) => {
          return (
            name.toLowerCase().includes(search) ||
            manufacturer.toLowerCase().includes(search) ||
            category.toLowerCase().includes(search)
          );
        },
      );
    }
    return products;
  });

export const getProductsSimpleList = (id = '') =>
  createSelector(getProducts, products =>
    products
      .map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      .filter(el => el.value !== id),
  );
