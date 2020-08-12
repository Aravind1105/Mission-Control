import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getWidgetMonthlyData as action,
  getWidgetMonthlyDataSuccess as actionSuccess,
} from '../actions';
import { GET_WIDGET_MONTHLY_DATA } from '../schema';

function* handler() {
  const startDateOfMonth = new Date(new Date().setDate(1));
  try {
    const {
      data: { getTotalNetIncome, getTotalGrossIncome },
    } = yield call(gqlTransactions.query, {
      query: GET_WIDGET_MONTHLY_DATA,
      variables: {
        period: {
          from: startDateOfMonth,
          to: new Date(),
        },
      },
    });
    yield put(
      actionSuccess({
        totalMonthlyNetIncome: getTotalNetIncome,
        totalMonthlyGrossIncome: getTotalGrossIncome,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
