import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getAllProducts as action,
  getAllProductsSuccess as actionSuccess,
  getAllProductsFailed as actionFailed,
} from '../actions';
import { GET_PRODUCTS_QUERY } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: { getProductLinesStatisticsGrid },
    } = yield call(gqlTransactions.query, {
      query: GET_PRODUCTS_QUERY,
      variables: payload,
    });

    yield put(
      actionSuccess({
        productList: getProductLinesStatisticsGrid.data || [],
        totalProducts: getProductLinesStatisticsGrid.total || 0,
      }),
    );
  } catch (error) {
    yield put(actionFailed());
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
