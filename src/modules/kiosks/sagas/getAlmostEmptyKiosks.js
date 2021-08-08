import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALMOST_EMPTY_KIOSKS } from '../schema';
import { updateAlmostEmptyKiosks, getAlmostEmptyKiosks } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const { data, errors } = yield call(gqlKiosk.query, {
      query: GET_ALMOST_EMPTY_KIOSKS,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else yield put(updateAlmostEmptyKiosks(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAlmostEmptyKiosks, handler);
}
