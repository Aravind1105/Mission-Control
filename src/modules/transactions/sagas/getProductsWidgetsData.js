import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getProductsWidgetsData as action,
  getProductsWidgetsDataSuccess as actionSuccess,
} from '../actions';
import { GET_PRODUCTS_WIDGET_DATA } from '../schema';

function* handler({ payload }) {
  const startDateOfMonth = new Date(
    new Date(new Date().setHours(0, 0, 0)).setDate(1),
  );
  try {
    const {
      data: {
        getMostSoldProduct,
        getLeastSoldProduct,
        getMostRefilledProduct,
        getMostRemovedProduct,
      },
    } = yield call(gqlTransactions.query, {
      query: GET_PRODUCTS_WIDGET_DATA,

      variables: {
        period:
          payload && payload.period
            ? {
                from: payload.period.dateFrom,
                to: payload.period.dateTo,
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
        mostSoldProductName:
          getMostSoldProduct.productLine && getMostSoldProduct.productLine.name,
        mostSoldProductValue: getMostSoldProduct,
        leastSoldProductName:
          getLeastSoldProduct.productLine &&
          getLeastSoldProduct.productLine.name,
        leastSoldProductValue: getLeastSoldProduct,
        mostRefilledProductName:
          getMostRefilledProduct.productLine &&
          getMostRefilledProduct.productLine.name,
        mostRefilledProductValue: getMostRefilledProduct,
        mostRemovedProductName:
          getMostRemovedProduct.productLine &&
          getMostRemovedProduct.productLine.name,
        mostRemovedProductValue: getMostRemovedProduct,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
