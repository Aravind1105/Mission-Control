import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getPriceHistory as action,
  getPriceHistorySuccess as actionSuccess,
} from '../actions';
import { GET_PRODUCT_PRICE_HISTORY } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: {
        getDefaultProductLinePriceHistory,
        getProductLineActivePriceHistory,
      },
    } = yield call(gqlProducts.query, {
      query: GET_PRODUCT_PRICE_HISTORY,
      variables: {
        productLineId: payload.productLineId,
      },
    });
    yield put(
      actionSuccess({
        defaultPriceHistory: getDefaultProductLinePriceHistory,
        activePriceHistory: getProductLineActivePriceHistory,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
