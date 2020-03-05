import { createAction } from 'redux-actions';

// Saga actions
export const loadProductsSaga = createAction('@@saga/PRODUCT_LOAD');

export const PRODUCT_SAGA_ADD = '@@saga/PRODUCT_ADD';
export const addProductsSaga = createAction(PRODUCT_SAGA_ADD);

export const FAMILYANDTAX_SAGA_ADD = '@@saga/FAMILYANDTAX_ADD';
export const loadFamilyAndTaxSaga = createAction(FAMILYANDTAX_SAGA_ADD);

//State Actions
export const updateProducts = createAction('@@state/PRODUCT_UPDATE');
export const updateSingleProduct = createAction(
  '@@state/UPDATE_SINGLE_PRODUCT',
);
export const updateFamily = createAction('@@state/FAMILY_UPDATE');
export const updateTax = createAction('@@state/TAX_UPDATE');
