import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getAllTransactions as action,
  getAllTransactionsSuccess as actionSuccess,
  getAllTransactionsFailed as actionFailed,
} from '../actions';
import { GET_TRANSACTIONS_QUERY } from '../schema';

function* handler({ payload }) {
  try {
    const {
      data: { findAllTransactionsGrid: response },
    } = yield call(gqlTransactions.query, {
      query: GET_TRANSACTIONS_QUERY,
      variables: payload,
    });

    yield put(
      actionSuccess({
        list: response.data || [],
        totalTransactions: response.total || 0,
      }),
    );
  } catch (error) {
    yield put(actionFailed());
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
