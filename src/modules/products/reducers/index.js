import { handleActions } from 'redux-actions';
import {
  updateProducts,
  updateTax,
  updateFamily,
  updateSingleProduct,
  loadProductsSaga,
} from '../actions';

const initialState = {
  product: [],
  isLoading: false,
  family: [],
  tax: [],
};

export default handleActions(
  {
    [loadProductsSaga]: state => ({
      ...state,
      isLoading: true,
    }),
    [updateProducts]: (state, { payload }) => ({
      ...state,
      product: payload,
      isLoading: false,
    }),
    [updateFamily]: (state, { payload }) => ({
      ...state,
      family: payload,
    }),
    [updateSingleProduct]: (state, { payload }) => ({
      ...state,
      product: state.product.map(el => (el._id === payload._id ? payload : el)),
    }),
    [updateTax]: (state, { payload }) => ({
      ...state,
      tax: payload,
    }),
  },
  initialState,
);
