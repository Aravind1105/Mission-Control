import { call, put, takeLatest } from 'redux-saga/effects';

import gqlProducts from 'lib/https/gqlProducts';
import {
  getManufacturers as action,
  getManufacturersSuccess as actionSuccess,
} from '../actions';
import { GET_MANUFACTURERS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({}) {
  try {
    const {
      data: { getManufacturers },
      errors,
    } = yield call(gqlProducts.query, {
      query: GET_MANUFACTURERS,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else yield put(actionSuccess(getManufacturers));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
