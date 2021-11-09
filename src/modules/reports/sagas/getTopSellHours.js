import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlTransactions';
import {
  getTopSellHours as action,
  getTopSellHoursSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_SELL_HOURS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  let dateFrom = new Date(new Date(new Date().setHours(0, 0, 0)).setDate(1));
  let dateTo = new Date();
  if (payload.period && payload.period.$gte) {
    dateFrom = payload.period.$gte;
  }

  if (payload.period && payload.period.$lte) {
    dateTo = payload.period.$lte;
  }
  try {
    const {
      data: { getTopSellHours },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_TOP_SELL_HOURS,
      variables: {
        period: {
          from: dateFrom,
          to: dateTo,
        },
        kioskIds: payload && payload.kioskId,
      },
    });

    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          topSellHours: getTopSellHours,
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
