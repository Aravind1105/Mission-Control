import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_KIOSKS_LIST } from '../schema';
import { getKiosksList, getKiosksListSuccess } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({}) {
  try {
    const {
      data: { getAllKiosks },
      errors,
    } = yield call(gqlKiosk.query, {
      query: GET_KIOSKS_LIST,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else yield put(getKiosksListSuccess(getAllKiosks));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getKiosksList, handler);
}
