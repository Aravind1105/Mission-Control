import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlReports';
import {
    getSalesStatistic as action,
    getSalesStatisticSuccess as actionSuccess,
  } from '../actions';
import { GET_SALES_STATISTICS_DATA } from '../schema';

function* handler() {
  try {
    const {
      data: { salesByKiosk },
    } = yield call(gqlReports.query, {
      query: GET_SALES_STATISTICS_DATA,
    });
    yield put(
      actionSuccess({
        salesByKiosk,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
