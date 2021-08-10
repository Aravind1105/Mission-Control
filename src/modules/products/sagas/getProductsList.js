import { call, put, takeEvery } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getProductListSaga as action,
  getProductListSuccess as actionSuccess,
} from '../actions';
import { GET_ALL_PRODUCTS_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload = GET_ALL_PRODUCTS_QUERY }) {
  try {
    const {
      data: { getProductLines = [], getProductFamilies = [] },
      errors,
    } = yield call(gqlProducts.query, {
      query: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      const response = {
        products: getProductLines,
        families: getProductFamilies,
      };
      yield put(actionSuccess(response));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
