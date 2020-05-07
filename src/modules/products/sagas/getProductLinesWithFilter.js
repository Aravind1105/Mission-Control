import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getProductLinesWithFilter as action,
  getProductListSuccess as actionSuccess,
} from '../actions';
import { GET_ALL_PRODUCTS_EXTENDED_QUERY } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: { productLinesGrid, getProductFamilies = [] },
    } = yield call(gqlProducts.query, {
      query: GET_ALL_PRODUCTS_EXTENDED_QUERY,
      variables: payload,
    });

    const response = {
      products: productLinesGrid.data,
      totalProducts: productLinesGrid.total,
      families: getProductFamilies,
    };
    yield put(actionSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
