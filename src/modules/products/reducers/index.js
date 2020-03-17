import { handleActions, combineActions } from 'redux-actions';
import {
  getProductListSuccess,
  updateTax,
  updateSingleProduct,
  getProductListSaga,
  getProductSaga,
  getFullProductData,
  getProductSuccess,
  getProductFamilySuccess,
  getFullProductDataSuccess,
  modifyProductSuccess,
} from '../actions';

const initialState = {
  list: [],
  product: null,
  isLoading: false,
  family: [],
  taxes: [],
};

export default handleActions(
  {
    [combineActions(getProductListSaga, getFullProductData)]: state => ({
      ...state,
      isLoading: true,
    }),
    [getProductListSuccess]: (state, { payload }) => ({
      ...state,
      list: payload,
      isLoading: false,
    }),
    [updateSingleProduct]: (state, { payload }) => ({
      ...state,
      list: state.list.map(el => (el._id === payload._id ? payload : el)),
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
    }),
    [getProductFamilySuccess]: (state, { payload }) => ({
      ...state,
      family: payload,
    }),
  },
  initialState,
);
