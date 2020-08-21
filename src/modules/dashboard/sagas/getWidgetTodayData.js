import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getWidgetTodayData as action,
  getWidgetTodayDataSuccess as actionSuccess,
} from '../actions';
import { GET_WIDGET_TODAY_DATA } from '../schema';

function* handler() {
  try {
    const {
      data: { getTotalNumberOfCustomers, getTotalNumberOfProductsSold, getTotalNetIncome, getTotalGrossIncome },
    } = yield call(gqlTransactions.query, {
      query: GET_WIDGET_TODAY_DATA,
      variables: {
        period: {
          from: new Date(new Date().setHours(0, 0, 0)),
          to: new Date(),
        },
      },
    });
    yield put(
      actionSuccess({
        totalNumberOfCustomers: getTotalNumberOfCustomers,
        totalNumberOfProducts: getTotalNumberOfProductsSold,
        totalGrossIncome: getTotalGrossIncome,
        totalNetIncome: getTotalNetIncome,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
