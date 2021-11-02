import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { getAllSerialNumbersSuccess, getAllSerialNumbers } from '../actions';
import { GET_ALL_SERIAL_NUMBERS } from '../schema';

function* handler({}) {
  try {
    const {
      data: { getAllSerialNumbers },
      errors,
    } = yield call(gqlKiosk.query, {
      query: GET_ALL_SERIAL_NUMBERS,
      variables: {},
    });

    yield put(getAllSerialNumbersSuccess(getAllSerialNumbers));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAllSerialNumbers, handler);
}
