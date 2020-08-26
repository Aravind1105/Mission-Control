/* eslint-disable import/named */
import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_TEMPERATURE_LOGS } from '../schema';
import { getTemperatureLogs, getTemperatureLogsSuccess } from '../actions';

function* handler({ payload }) {
  try {
    const { data: { getTemperatureEventsByKioskWithResolution } } = yield call(gqlKiosk.query, {
      query: GET_TEMPERATURE_LOGS,
      variables: {
        kioskId: '5c17a3d963ca649138ec522c',
        from: '2020-01-01',
        to: '2020-08-01',
        limit: 100,
        resolution: 'MONTH',
      },
    });
    yield put(getTemperatureLogsSuccess({
      temperatureLogs: getTemperatureEventsByKioskWithResolution,
    }));
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getTemperatureLogs, handler);
}
