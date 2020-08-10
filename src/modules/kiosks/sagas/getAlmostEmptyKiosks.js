import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALMOST_EMPTY_KIOSKS } from '../schema';
import { updateAlmostEmptyKiosks, getAlmostEmptyKiosks } from '../actions';

function* handler({ payload }) {
  try {
    const { data } = yield call(gqlKiosk.query, {
      query: GET_ALMOST_EMPTY_KIOSKS,
      variables: payload,
    });
    yield put(updateAlmostEmptyKiosks(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAlmostEmptyKiosks, handler);
}
