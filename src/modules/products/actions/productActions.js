import { createAction } from 'redux-actions';
import { EventEmitter } from 'events';


// Saga actions
export const PRODUCT_SAGA_LOAD = '@@saga/PRODUCT_LOAD';
export const loadProductsSaga = createAction(PRODUCT_SAGA_LOAD);

export const PRODUCT_SAGA_ADD = '@@saga/PRODUCT_ADD';
export const addProductsSaga = createAction(PRODUCT_SAGA_ADD);

export const FAMILYANDTAX_SAGA_ADD = '@@saga/FAMILYANDTAX_ADD';
export const loadFamilyAndTaxSaga = createAction(FAMILYANDTAX_SAGA_ADD);

//State Actions
export const PRODUCTS_STATE_UPDATE = '@@state/PRODUCT_UPDATE';
export const updateProducts = createAction(PRODUCTS_STATE_UPDATE);

export const FAMILY_STATE_UPDATE = '@@state/FAMILY_UPDATE';
export const updateFamily = createAction(FAMILY_STATE_UPDATE);

export const TAX_STATE_UPDATE = '@@state/TAX_UPDATE';
export const updateTax = createAction(TAX_STATE_UPDATE);


export const Search_Text = '@@state/Search_Text';
