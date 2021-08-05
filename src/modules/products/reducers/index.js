import { handleActions, combineActions } from 'redux-actions';
import {
  getProductListSuccess,
  updateTax,
  updateSingleProduct,
  getProductListSaga,
  getProductLinesWithFilter,
  getProductSaga,
  getFullProductData,
  getProductSuccess,
  getFullProductDataSuccess,
  modifyProductSaga,
  modifyProductSuccess,
  getPriceHistorySuccess,
  resetPriceHistory,
  deleteActivePriceHistorySuccess,
  modifyProductImageSuccess,
  deleteProductImageSuccess,
  getManufacturersSuccess,
} from '../actions';

const initialState = {
  list: [],
  totalProducts: 0,
  product: null,
  isLoading: false,
  family: [],
  taxes: [],
  defaultPriceHistory: [],
  activePriceHistory: [],
  manufacturers: [],
};

export default handleActions(
  {
    [combineActions(
      getProductListSaga,
      getFullProductData,
      getProductLinesWithFilter,
    )]: state => ({
      ...state,
      isLoading: true,
    }),
    [getProductListSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.products,
      family: payload.families,
      totalProducts: payload.totalProducts || 0,
      isLoading: false,
    }),
    [modifyProductSaga]: state => ({
      ...state,
      isLoading: true,
    }),
    [updateTax]: (state, { payload }) => ({
      ...state,
      tax: payload,
    }),
    [getProductSaga]: state => ({
      ...state,
      isLoading: true,
    }),
    [getFullProductDataSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      product: payload.product,
      family: payload.family,
      taxes: payload.taxes,
    }),
    [combineActions(getProductSuccess, modifyProductSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      product: payload,
      isLoading: false,
    }),
    [modifyProductImageSuccess]: (state, { payload }) => ({
      ...state,
      product: { ...state.product, images: payload.images },
    }),
    [deleteProductImageSuccess]: (state, { payload }) => ({
      ...state,
      product: { ...state.product, images: [] },
    }),
    [getPriceHistorySuccess]: (state, { payload }) => ({
      ...state,
      defaultPriceHistory: payload.defaultPriceHistory,
      activePriceHistory: payload.activePriceHistory,
    }),
    [resetPriceHistory]: state => ({
      ...state,
      defaultPriceHistory: [],
      activePriceHistory: [],
    }),
    [deleteActivePriceHistorySuccess]: (state, { payload }) => ({
      ...state,
      activePriceHistory: payload.activePriceHistory,
    }),
    [getManufacturersSuccess]: (state, { payload }) => ({
      ...state,
      manufacturers: payload,
    }),
  },
  initialState,
);
