import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlReports';
import {
  getSalesStatistic as action,
  getSalesStatisticSuccess as actionSuccess,
} from '../actions';
import { GET_SALES_STATISTICS_DATA } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler() {
  try {
    const {
      data: { salesByKiosk },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_SALES_STATISTICS_DATA,
    });
    if (errors && errors[0].message === 'Token expired') {
      yield put(updateSessionExpired(true));
    } else {
      yield put(
        actionSuccess({
          salesByKiosk,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
