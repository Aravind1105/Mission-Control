/* eslint-disable import/named */
import { call, put, takeLatest } from 'redux-saga/effects';

import gqlKiosk from 'lib/https/gqlKiosk';
import { GET_ACTIVITY_LOGS } from '../schema';
import { getActivityLogs, getActivityLogsSuccess } from '../actions';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { gridActivities },
      errors,
    } = yield call(gqlKiosk.query, {
      query: GET_ACTIVITY_LOGS,
      variables: {
        kiosk: payload.data.kioskId,
        limit: payload.data.limit,
        skip: payload.data.skip,
        sort: payload.data.sort,
        period:
          payload.data.date.$gte !== undefined &&
          payload.data.date.$lte !== undefined
            ? {
                from: payload.data.date.$gte,
                to: payload.data.date.$lte,
              }
            : null,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        getActivityLogsSuccess({
          activityLogs: gridActivities,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(getActivityLogs, handler);
}
