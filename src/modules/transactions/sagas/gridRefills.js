import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getGridRefills as action,
  getGridRefillsSuccess as actionSuccess,
  getGridRefillsFailed as actionFailed,
} from '../actions';
import { GRID_REFILLS_QUERY } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: { gridRefills },
    } = yield call(gqlTransactions.query, {
      query: GRID_REFILLS_QUERY,
      variables: payload,
    });
    yield put(
      actionSuccess({
        refillsList: gridRefills.data || [],
        totalRefills: gridRefills.total || 0,
      }),
    );
  } catch (error) {
    yield put(actionFailed());
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
