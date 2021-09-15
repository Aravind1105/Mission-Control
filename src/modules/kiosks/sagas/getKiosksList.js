import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_KIOSKS_LIST } from '../schema';
import { getKiosksList, getKiosksListSuccess } from '../actions';

function* handler({}) {
  try {
    const {
      data: { getAllKiosks },
      errors,
    } = yield call(gqlKiosk.query, {
      query: GET_KIOSKS_LIST,
    });
    yield put(getKiosksListSuccess(getAllKiosks));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getKiosksList, handler);
}
