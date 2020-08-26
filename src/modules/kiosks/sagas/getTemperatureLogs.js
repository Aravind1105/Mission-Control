/* eslint-disable import/named */
import { call, put, takeLatest } from 'redux-saga/effects';

import gqlIot from 'lib/https/gqlIot';
import { GET_TEMPERATURE_LOGS } from '../schema';
import { getTemperatureLogs, getTemperatureLogsSuccess } from '../actions';

function* handler({ payload }) {
  try {
    const { data: { getTemperatureEventsByKioskWithResolution } } = yield call(gqlIot.query, {
      query: GET_TEMPERATURE_LOGS,
      variables: {
        data: {
          kioskId: payload.kioskId,
          from: payload.from,
          to: payload.to,
          limit: 25,
          resolution: payload.resolution,
        },
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
