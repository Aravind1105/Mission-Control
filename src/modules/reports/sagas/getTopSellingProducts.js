import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlTransactions';
import {
  getTopSellingProducts as action,
  getTopSellingProductsSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_SELLING_PRODUCTS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getTopSellingProducts },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_TOP_SELLING_PRODUCTS,
      variables: {
        period: payload?.period
          ? {
              from: payload.period.$gte,
              to: payload.period.$lte,
            }
          : {
              from: new Date(+0),
              to: new Date(),
            },
        kioskIds: payload?.kioskId,
      },
    });

    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          topSellingProducts: getTopSellingProducts,
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
