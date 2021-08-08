import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getAllProducts as action,
  getAllProductsSuccess as actionSuccess,
  getAllProductsFailed as actionFailed,
} from '../actions';
import { GET_PRODUCTS_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getProductLinesStatisticsGrid },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_PRODUCTS_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          productList: getProductLinesStatisticsGrid.data || [],
          totalProducts: getProductLinesStatisticsGrid.total || 0,
        }),
      );
    }
  } catch (error) {
    yield put(actionFailed());
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
