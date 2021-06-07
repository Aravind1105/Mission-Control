import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  deleteActivePriceHistory as action,
  deleteActivePriceHistorySuccess as actionSuccess,
} from '../actions';
import { DELETE_PRODUCT_LINE_ACTIVE_PRICE } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: { deleteActivePriceHistory },
    } = yield call(gqlProducts.mutate, {
      mutation: DELETE_PRODUCT_LINE_ACTIVE_PRICE,
      variables: {
        productLineId: payload.productLineId,
        priceHistoryId: payload.priceHistoryId,
      },
    });
    yield put(
      actionSuccess({
        activePriceHistory: deleteActivePriceHistory,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
