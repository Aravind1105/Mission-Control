import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getTransactionsWidgetsData as action,
  getTransactionsWidgetsDataSuccess as actionSuccess,
} from '../actions';
import { GET_TRANSACTIONS_WIDGET_DATA } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: {
        getTotalNumberOfTransactions,
        getAveragePurchaseValue,
        getTotalNumberOfProductsSold,
        getTotalNetIncome,
        getTotalGrossIncome,
      },
      errors,
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
                from: new Date(+0),
                to: new Date(),
              },
        kioskId: payload && payload.kioskId,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          totalNumberOfTransactions: getTotalNumberOfTransactions,
          averagePurchaseValue: getAveragePurchaseValue,
          totalNumberOfProductsSold: getTotalNumberOfProductsSold,
          totalNetIncome: getTotalNetIncome,
          totalGrossIncome: getTotalGrossIncome,
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
