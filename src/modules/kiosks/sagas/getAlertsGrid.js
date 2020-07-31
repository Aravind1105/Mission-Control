import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ALERTS_GRID } from '../schema';
import { getAlertsGrid, getAlertsGridSuccess } from '../actions';

function* handler({ payload: { data } }) {
  try {
    const resp = yield call(gqlKiosk.query, {
      query: GET_ALERTS_GRID,
      variables: {
        data,
      },
    });
    yield put(getAlertsGridSuccess(resp.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getAlertsGrid, handler);
}
