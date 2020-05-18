import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import {
  resetKiosk as action,
  resetKioskSuccess as actionSuccess,
} from '../actions';
import { KIOSK_RESET_MUTATION } from '../schema';

function* handler({ payload }) {
  try {
    const variables = {
      id: payload,
    };
    const { data } = yield call(gqlKiosk.mutate, {
      mutation: KIOSK_RESET_MUTATION,
      variables,
    });
    console.log(data);

    yield put(actionSuccess(data.kioskReset));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
