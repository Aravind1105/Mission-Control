import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getWidgetData as action,
  getWidgetDataSuccess as actionSuccess,
} from '../actions';
import { GET_REPORTS_WIDGET_DATA } from '../schema';
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
        period: {
          from: dateFrom,
          to: dateTo,
        },
        kioskId: payload && payload.kioskId,
        kioskIds: payload && payload.kioskId,
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
