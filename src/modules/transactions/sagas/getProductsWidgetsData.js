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
        leastSoldProductName: getLeastSoldProduct.productLine.name || ' ',
        leastSoldProductValue: getLeastSoldProduct.sum || 0,
        mostRefilledProductName: getMostRefilledProduct.productLine.name || '',
        mostRefilledProductValue: getMostRefilledProduct.sum || 0,
        mostRemovedProductName: getMostRemovedProduct.productLine.name || '',
        mostRemovedProductValue: getMostRemovedProduct.sum || 0,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
