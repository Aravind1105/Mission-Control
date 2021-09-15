import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getRefillsWidgetsData as action,
  getRefillsWidgetsDataSuccess as actionSuccess,
} from '../actions';
import { GET_REFILLS_WIDGET_DATA } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  const startDateOfMonth = new Date(
    new Date(new Date().setHours(0, 0, 0)).setDate(1),
  );
  try {
    const {
      data: {
        getTotalNumberOfProductsAdded,
        getTotalGrossValueOfRefills,
        getTotalNumberOfProductsRemoved,
        getAverageSpoilageRate,
        getDefaultTotalSalesValueOfRefills,
        getDefaultTotalCostValueOfRefills,
      },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_REFILLS_WIDGET_DATA,
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
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          totalNumberOfProductsAdded: getTotalNumberOfProductsAdded,
          totalGrossValueOfRefills: getTotalGrossValueOfRefills,
          totalNumberOfProductsRemoved: getTotalNumberOfProductsRemoved,
          averageSpoilageRate: getAverageSpoilageRate,
          totalCostValueOfReplenishedProducts: getDefaultTotalCostValueOfRefills,
          totalSaleValueOfReplenishedProducts: getDefaultTotalSalesValueOfRefills,
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
