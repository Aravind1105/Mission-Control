import { takeLatest, call, put } from 'redux-saga/effects';

import gqlReports from 'lib/https/gqlReports';
import {
  getTopSellingKiosks as action,
  getTopSellingKiosksSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_SELLING_KIOSKS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  let dateFrom = new Date(new Date(new Date().setHours(0, 0, 0)).setDate(1));
  let dateTo = new Date();
  if (payload.period && payload.period.$gte) {
    dateFrom = payload.period.$gte;
  }

  if (payload.period && payload.period.$lte) {
    dateTo = payload.period.$lte;
  }
  try {
    const {
      data: { topSellingKiosks },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_TOP_SELLING_KIOSKS,
      variables: {
        period: {
          from: dateFrom,
          to: dateTo,
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
