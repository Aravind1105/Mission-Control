import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlTransactions';
import {
  getTopSell as action,
  getTopSellSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_SELL_HOURS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getTopSellHours, getTopSellWeek },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_TOP_SELL_HOURS,
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
          topSellHours: getTopSellHours,
          topSellWeek: getTopSellWeek,
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
