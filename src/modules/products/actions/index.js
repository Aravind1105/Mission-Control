import { createAction } from 'redux-actions';

// Saga actions
export const getProductListSaga = createAction('@@saga/GET_PRODUCTS_LIST');
export const getProductSaga = createAction('@@saga/GET_PRODUCT');
export const getProductFamilySaga = createAction('@@saga/GET_PRODUCT_FAMILY');
export const getFullProductData = createAction('@@saga/GET_FULL_PRODUCT_DATA');
export const modifyProductSaga = createAction('@@saga/MODIFY_PRODUCT');

export const FAMILYANDTAX_SAGA_ADD = '@@saga/FAMILYANDTAX_ADD';
export const loadFamilyAndTaxSaga = createAction(FAMILYANDTAX_SAGA_ADD);

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
export const getProductFamilySuccess = createAction(
  '@@state/GET_PRODUCT_FAMILY_SUCCESS',
);
export const modifyProductSuccess = createAction(
  '@@state/MODIFY_PRODUCT_SUCCESS',
);
