import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getRefillsWidgetsData as action,
  getRefillsWidgetsDataSuccess as actionSuccess,
} from '../actions';
import { GET_REFILLS_WIDGET_DATA } from '../schema';

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
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
