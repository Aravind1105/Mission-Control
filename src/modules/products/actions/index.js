import { createAction } from 'redux-actions';

// Saga actions
export const getProductListSaga = createAction('@@saga/GET_PRODUCTS_LIST');
export const getProductLinesWithFilter = createAction('@@saga/GET_PRODUCT_LINES_WITH_FILTER');
export const getProductSaga = createAction('@@saga/GET_PRODUCT');
export const getFullProductData = createAction('@@saga/GET_FULL_PRODUCT_DATA');
export const modifyProductSaga = createAction('@@saga/MODIFY_PRODUCT');
export const deleteProductSaga = createAction('@@saga/DELETE_PRODUCT');
export const modifyProductImage = createAction('@@saga/MODIFY_PRODUCT_IMAGE');
export const deleteProductImage = createAction('@@saga/DELETE_PRODUCT_IMAGE');
export const getPriceHistory = createAction('@@saga/GET_PRICE_HISTORY');

// State Actions
export const getProductListSuccess = createAction('@@state/GET_PRODUCTS_LIST_SUCCESS');
export const updateSingleProduct = createAction('@@state/UPDATE_SINGLE_PRODUCT');
export const updateFamily = createAction('@@state/FAMILY_UPDATE');
export const updateTax = createAction('@@state/TAX_UPDATE');
export const getProductSuccess = createAction('@@state/GET_PRODUCT_SUCCESS');
export const getFullProductDataSuccess = createAction('@@state/GET_FULL_PRODUCT_DATA_SUCCESS');
export const modifyProductSuccess = createAction('@@state/MODIFY_PRODUCT_SUCCESS');
export const deleteProductSuccess = createAction('@@state/DELETE_PRODUCT_SUCCESS');
export const modifyProductImageSuccess = createAction('@@saga/MODIFY_PRODUCT_IMAGE_SUCCESS');
export const deleteProductImageSuccess = createAction('@@saga/DELETE_PRODUCT_IMAGE_SUCCESS');
export const getPriceHistorySuccess = createAction('@@saga/GET_PRICE_HISTORY_SUCCESS');
