import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getWidgetData as action,
  getWidgetDataSuccess as actionSuccess,
} from '../actions';
import { GET_REPORTS_WIDGET_DATA } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: {
        getTotalNumberOfProductsSold,
        getTotalNetIncome,
        getAverageDailyNetRevenue,
        getPeakSalesHour,
      },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_REPORTS_WIDGET_DATA,
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
        kioskId: payload?.kioskId,
      },
    });

    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          totalNumberOfProductsSold: getTotalNumberOfProductsSold,
          totalNetIncome: getTotalNetIncome,
          averageDailyRevenue: getAverageDailyNetRevenue,
          peakSalesHour: getPeakSalesHour,
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
