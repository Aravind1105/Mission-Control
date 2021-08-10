import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALERTS_GRID } from '../schema';
import { getAlertsGrid, getAlertsGridSuccess } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload: { data } }) {
  try {
    const resp = yield call(gqlKiosk.query, {
      query: GET_ALERTS_GRID,
      variables: {
        data,
      },
    });
    if (resp.errors && resp.errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else yield put(getAlertsGridSuccess(resp.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAlertsGrid, handler);
}
