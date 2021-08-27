import { call, put, takeEvery } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getKiosksWithProduct as action,
  getKiosksWithProductSuccess as actionSuccess,
} from '../actions';
import { GET_KIOSKS_WITH_PRODUCT } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: { getProductLineLinkedKiosks },
      errors,
    } = yield call(gqlProducts.query, {
      query: GET_KIOSKS_WITH_PRODUCT,
      variables: payload,
    });

    yield put(actionSuccess(getProductLineLinkedKiosks));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeEvery(action, handler);
}
