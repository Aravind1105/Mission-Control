import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  deleteActivePriceHistory as action,
  deleteActivePriceHistorySuccess as actionSuccess,
} from '../actions';
import { DELETE_PRODUCT_LINE_ACTIVE_PRICE } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { deleteActivePriceHistory },
      errors,
    } = yield call(gqlProducts.mutate, {
      mutation: DELETE_PRODUCT_LINE_ACTIVE_PRICE,
      variables: {
        productLineId: payload.productLineId,
        priceHistoryId: payload.priceHistoryId,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          activePriceHistory: deleteActivePriceHistory,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
