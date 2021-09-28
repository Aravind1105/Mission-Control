import { takeLatest, call, put } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import {
  getAllTransactions as action,
  getAllTransactionsSuccess as actionSuccess,
  getAllTransactionsFailed as actionFailed,
} from '../actions';
import { GET_TRANSACTIONS_QUERY } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { findAllTransactionsGrid: response },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_TRANSACTIONS_QUERY,
      variables: payload,
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        actionSuccess({
          list: response.data || [],
          totalTransactions: response.total || 0,
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
