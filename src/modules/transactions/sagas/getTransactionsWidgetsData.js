import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getTransactionsWidgetsData as action,
  getTransactionsWidgetsDataSuccess as actionSuccess,
} from '../actions';
import { GET_TRANSACTIONS_WIDGET_DATA } from '../schema';

function* handler({ payload }) {
  const startDateOfMonth = new Date(new Date().setDate(1));
  try {
    const {
      data: {
        getTotalNumberOfTransactions,
        getAveragePurchaseValue,
        getTotalNumberOfProductsSold,
        getTotalNetIncome,
      },
    } = yield call(gqlTransactions.query, {
      query: GET_TRANSACTIONS_WIDGET_DATA,
      variables: {
        period:
          payload && payload.period
            ? {
                from: payload.period.$gte,
                to: payload.period.$lte,
              }
            : {
                from: startDateOfMonth,
                to: new Date(),
              },
        kioskId: payload && payload.kioskId,
      },
    });
    yield put(
      actionSuccess({
        totalNumberOfTransactions: getTotalNumberOfTransactions,
        averagePurchaseValue: getAveragePurchaseValue,
        totalNumberOfProductsSold: getTotalNumberOfProductsSold,
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
