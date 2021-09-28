import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getGridRefills as action,
  getGridRefillsSuccess as actionSuccess,
  getGridRefillsFailed as actionFailed,
} from '../actions';
import { GRID_REFILLS_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { gridRefills },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GRID_REFILLS_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          refillsList: gridRefills.data || [],
          totalRefills: gridRefills.total || 0,
        }),
      );
    }
  } catch (error) {
    yield put(actionFailed());
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
