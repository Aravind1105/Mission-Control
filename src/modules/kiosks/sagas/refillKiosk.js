import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import {
  refillKiosk as action,
  // modifyKioskSuccess as actionSuccess,
} from '../actions';
import { KIOSK_REFILL_MUTATION } from '../schema';

function* handler({ payload }) {
  try {
    const variables = {
      kioskId: payload,
    };
    const { data } = yield call(gqlKiosk.mutate, {
      mutation: KIOSK_REFILL_MUTATION,
      variables,
    });
    console.log(data);

    // yield put(actionSuccess(responseData));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
