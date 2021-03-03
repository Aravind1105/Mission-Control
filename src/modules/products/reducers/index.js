import { handleActions, combineActions } from 'redux-actions';
import {
  getProductListSuccess,
  updateTax,
  updateSingleProduct,
  getProductListSaga,
  getDefaultProductLinePriceHistory,
  getProductLineActivePriceHistory,
  getProductLinesWithFilter,
  getProductSaga,
  getFullProductData,
  getProductSuccess,
  getDefaultProductLinePriceHistorySuccess,
  getProductLineActivePriceHistorySuccess,
  getFullProductDataSuccess,
  modifyProductSaga,
  modifyProductSuccess,
} from '../actions';

const initialState = {
  list: [],
  totalProducts: 0,
  product: null,
  isLoading: false,
  family: [],
  taxes: [],
};

export default handleActions(
  {
    [combineActions(
      getProductListSaga,
      getFullProductData,
      getProductLinesWithFilter,
      getDefaultProductLinePriceHistory,
      getProductLineActivePriceHistory,
    )]: state => ({
      ...state,
      isLoading: true,
    }),
    [getDefaultProductLinePriceHistorySuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      defaultPrice: payload,
    }),
    [getProductLineActivePriceHistorySuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      activePrice: payload,
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
  },
  initialState,
);
