import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getManufacturers as action,
  getManufacturersSuccess as actionSuccess,
} from '../actions';
import { GET_MANUFACTURERS } from '../schema';

function* handler({ }) {
  try {
    const {
      data: { getManufacturers },
    } = yield call(gqlProducts.query, {
      query: GET_MANUFACTURERS,
    });
    yield put(actionSuccess(getManufacturers));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
