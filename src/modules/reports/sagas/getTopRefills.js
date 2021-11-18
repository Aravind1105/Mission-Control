import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getTopRefills as action,
  getTopRefillsSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_REFILLS } from '../schema';
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
      data: { getTopRefillsWeek, getTopRefillsHour },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_TOP_REFILLS,
      variables: {
        period: {
          from: dateFrom,
          to: dateTo,
        },
        kioskIds: payload && payload.kioskId,
      },
    });

    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          topRefillsWeek: getTopRefillsWeek,
          topRefillsDay: getTopRefillsHour,
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
