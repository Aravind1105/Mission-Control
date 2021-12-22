import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlReports';
import {
  getTopSellingKiosks as action,
  getTopSellingKiosksSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_SELLING_KIOSKS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { topSellingKiosks },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_TOP_SELLING_KIOSKS,
      variables: {
        period: payload?.period
          ? {
              from: payload.period.$gte,
              to: payload.period.$lte,
            }
          : {
              from: new Date(+0),
              to: new Date(),
            },
      },
    });

    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          topSellingKiosks,
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
