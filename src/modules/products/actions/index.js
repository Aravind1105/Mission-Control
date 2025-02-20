import { createAction } from 'redux-actions';

// Saga actions
export const getProductListSaga = createAction('@@saga/GET_PRODUCTS_LIST');
export const getProductLinesWithFilter = createAction(
  '@@saga/GET_PRODUCT_LINES_WITH_FILTER',
);
export const getProductSaga = createAction('@@saga/GET_PRODUCT');
export const getFullProductData = createAction('@@saga/GET_FULL_PRODUCT_DATA');
export const modifyProductSaga = createAction('@@saga/MODIFY_PRODUCT');
export const deleteProductSaga = createAction('@@saga/DELETE_PRODUCT');
export const modifyProductImage = createAction('@@saga/MODIFY_PRODUCT_IMAGE');
export const deleteProductImage = createAction('@@saga/DELETE_PRODUCT_IMAGE');
export const getPriceHistory = createAction('@@saga/GET_PRICE_HISTORY');
export const resetPriceHistory = createAction('@@saga/RESET_PRICE_HISTORY');
export const resetProduct = createAction('@@saga/RESET_PRODUCT');
export const resetKioskWithProduct = createAction(
  '@@saga/RESET_KIOSK_WITH_PRODUCT',
);
export const deleteActivePriceHistory = createAction(
  '@@saga/DELETE_PRICE_HISTORY',
);
export const archiveProduct = createAction('@@saga/ARCHIVE_PRODUCT');
export const duplicateProductLine = createAction(
  '@@saga/DUPLICATE_PRODUCTLINE',
);
export const getManufacturers = createAction('@@saga/GET_MANUFACTURERS');

// State Actions
export const getProductListSuccess = createAction(
  '@@state/GET_PRODUCTS_LIST_SUCCESS',
);
export const updateSingleProduct = createAction(
  '@@state/UPDATE_SINGLE_PRODUCT',
);
export const updateFamily = createAction('@@state/FAMILY_UPDATE');
export const updateTax = createAction('@@state/TAX_UPDATE');
export const getProductSuccess = createAction('@@state/GET_PRODUCT_SUCCESS');
export const getFullProductDataSuccess = createAction(
  '@@state/GET_FULL_PRODUCT_DATA_SUCCESS',
);
export const modifyProductSuccess = createAction(
  '@@state/MODIFY_PRODUCT_SUCCESS',
);
export const deleteProductSuccess = createAction(
  '@@state/DELETE_PRODUCT_SUCCESS',
);
export const getKiosksWithProduct = createAction(
  '@@state/GET_KIOSKS_WITH_PRODUCT',
);

export const modifyProductImageSuccess = createAction(
  '@@saga/MODIFY_PRODUCT_IMAGE_SUCCESS',
);
export const deleteProductImageSuccess = createAction(
  '@@saga/DELETE_PRODUCT_IMAGE_SUCCESS',
);
export const getPriceHistorySuccess = createAction(
  '@@saga/GET_PRICE_HISTORY_SUCCESS',
);
export const deleteActivePriceHistorySuccess = createAction(
  '@@saga/DELETE_PRICE_HISTORY_SUCCESS',
);
export const getManufacturersSuccess = createAction(
  '@@saga/GET_MANUFACTURERS_SUCCESS',
);
export const getKiosksWithProductSuccess = createAction(
  '@@state/GET_KIOSKS_WITH_PRODUCT_SUCCESS',
);

// pagination actions
export const setSearch = createAction('@@state/SET_PRODUCT_SEARCH');
export const setCategory = createAction('@@state/SET_PRODUCTS_CATEGORY');
export const setManufacturer = createAction(
  '@@state/SET_PRODUCTS_MANUFACTURER',
);
export const setPage = createAction('@@state/SET_PRODUCTS_PAGE');
export const setPerPage = createAction('@@state/SET_PRODUCTS_PER_PAGE');
export const setSort = createAction('@@state/SET_PRODUCTS_SORT');
export const setFilters = createAction('@@state/SET_PRODUCTS_FILTERS');
