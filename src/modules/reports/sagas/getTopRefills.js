import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getTopRefills as action,
  getTopRefillsSuccess as actionSuccess,
} from '../actions';
import { GET_TOP_REFILLS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getTopRefillsWeek, getTopRefillsHour },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_TOP_REFILLS,
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
        kioskIds: payload?.kioskId,
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
