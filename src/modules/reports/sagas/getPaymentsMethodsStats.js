import { takeLatest, call, put } from 'redux-saga/effects';
import gqlReports from 'lib/https/gqlTransactions';
import {
  getPaymentsMethodsStats as action,
  getPaymentsMethodsStatsSuccess as actionSuccess,
} from '../actions';
import { GET_PAYMENTS_METHODS_STATS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { getPaymentsMethodsStats },
      errors,
    } = yield call(gqlReports.query, {
      query: GET_PAYMENTS_METHODS_STATS,
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
          paymentMethodsStats: getPaymentsMethodsStats,
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
