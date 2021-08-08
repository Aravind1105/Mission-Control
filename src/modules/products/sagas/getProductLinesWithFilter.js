import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getProductLinesWithFilter as action,
  getProductListSuccess as actionSuccess,
} from '../actions';
import { GET_ALL_PRODUCTS_EXTENDED_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { productLinesGrid, getProductFamilies = [] },
      errors,
    } = yield call(gqlProducts.query, {
      query: GET_ALL_PRODUCTS_EXTENDED_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      const response = {
        products: productLinesGrid.data,
        totalProducts: productLinesGrid.total,
        families: getProductFamilies,
      };
      yield put(actionSuccess(response));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
