import { call, put, takeEvery } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getDefaultProductLinePriceHistory as action,
  getDefaultProductLinePriceHistorySuccess as actionSuccess,
} from '../actions';
import { GET_DEFAULT_PRODUCTLINE_PRICE_HISTORY } from '../schema';

function* handler({ payload }) {
  try {
    const variables = {
      productLineId: payload,
    };
    const {
      data: { getDefaultProductLinePriceHistory = [] },
    } = yield call(gqlProducts.query, {
      query: GET_DEFAULT_PRODUCTLINE_PRICE_HISTORY,
      variables,
    });
    const response = getDefaultProductLinePriceHistory;
    yield put(actionSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
