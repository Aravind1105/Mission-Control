import { call, put, takeEvery } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getProductLineActivePriceHistory as action,
  getProductLineActivePriceHistorySuccess as actionSuccess,
} from '../actions';
import { GET_PRODUCTLINE_ACTIVE_PRICE_HISTORY } from '../schema';

function* handler({ payload }) {
  try {
    const variables = {
      productLineId: payload,
    };

    const {
      data: { getProductLineActivePriceHistory = [] },
    } = yield call(gqlProducts.query, {
      query: GET_PRODUCTLINE_ACTIVE_PRICE_HISTORY,
      variables,
    });
    const response = getProductLineActivePriceHistory;
    yield put(actionSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
