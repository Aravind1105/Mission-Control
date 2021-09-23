import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getProductsWidgetsData as action,
  getProductsWidgetsDataSuccess as actionSuccess,
} from '../actions';
import { GET_PRODUCTS_WIDGET_DATA } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  const startDateOfMonth = new Date(
    new Date(new Date().setHours(0, 0, 0)).setDate(1),
  );
  try {
    const variables = {
      period:
        payload && payload.period
          ? {
              from: payload.period.dateFrom,
              to: payload.period.dateTo,
            }
          : {
              from: startDateOfMonth,
              to: new Date(),
            }
    }
    if(payload && payload.kioskId) {
      variables.kioskId = payload.kioskId
    }
    const {
      data: {
        getMostSoldProduct,
        getLeastSoldProduct,
        getMostRefilledProduct,
        getMostRemovedProduct,
      },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_PRODUCTS_WIDGET_DATA,
      variables,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          mostSoldProductName:
            getMostSoldProduct.productLine &&
            getMostSoldProduct.productLine.name,
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
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
