import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getPriceHistory as action,
  getPriceHistorySuccess as actionSuccess,
} from '../actions';
import { GET_PRODUCT_PRICE_HISTORY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: {
        getDefaultProductLinePriceHistory,
        getProductLineActivePriceHistory,
      },
      errors,
    } = yield call(gqlProducts.query, {
      query: GET_PRODUCT_PRICE_HISTORY,
      variables: {
        productLineId: payload.productLineId,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          defaultPriceHistory: getDefaultProductLinePriceHistory,
          activePriceHistory: getProductLineActivePriceHistory,
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
