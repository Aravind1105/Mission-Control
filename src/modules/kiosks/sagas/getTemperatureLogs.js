/* eslint-disable import/named */
import { call, put, takeLatest } from 'redux-saga/effects';

import gqlIot from 'lib/https/gqlIot';
import { GET_TEMPERATURE_LOGS } from '../schema';
import { getTemperatureLogs, getTemperatureLogsSuccess } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

const today = new Date();
var date = new Date();
date.setDate(date.getDate() - 30);
var lastMonth = date.toISOString().split('T')[0];
function* handler({ payload }) {
  try {
    const {
      data: { getTemperatureEventsByKiosk },
      errors,
    } = yield call(gqlIot.query, {
      query: GET_TEMPERATURE_LOGS,
      variables: {
        kioskId: payload.kioskId,
        from: lastMonth,
        to: today,
        limit: 25,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        getTemperatureLogsSuccess({
          temperatureLogs: getTemperatureEventsByKiosk || [],
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getTemperatureLogs, handler);
}
