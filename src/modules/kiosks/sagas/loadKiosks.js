import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALL_KIOSKS_QUERY } from '../schema';
import { updateKiosks, loadKiosksSaga } from '../actions';

function* handler() {
  try {
    const { data } = yield call(gqlKiosk.query, {
      query: GET_ALL_KIOSKS_QUERY,
    });
    yield put(updateKiosks(data.getAllKiosks));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(loadKiosksSaga, handler);
}
