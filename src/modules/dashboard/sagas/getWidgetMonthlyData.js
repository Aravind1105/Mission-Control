import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getWidgetMonthlyData as action,
  getWidgetMonthlyDataSuccess as actionSuccess,
} from '../actions';
import { GET_WIDGET_MONTHLY_DATA } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler() {
  const startDateOfMonth = new Date(
    new Date(new Date().setHours(0, 0, 0)).setDate(1),
  );
  try {
    const {
      data: { getTotalNetIncome, getTotalGrossIncome },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_WIDGET_MONTHLY_DATA,
      variables: {
        period: {
          from: startDateOfMonth,
          to: new Date(),
        },
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          totalMonthlyNetIncome: getTotalNetIncome,
          totalMonthlyGrossIncome: getTotalGrossIncome,
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
