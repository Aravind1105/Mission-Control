import { call, put, takeEvery } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import { getUserTransactions, getUserTransactionsSuccess } from '../actions';
import { GET_USER_TRANSACTIONS } from '../schema';
import { updateSessionExpired } from '../../../core/actions/coreActions';

function* handler({ payload }) {
  try {
    const {
      data: { findUserTransactionsGrid },
      errors,
    } = yield call(gqlTransactions.query, {
      query: GET_USER_TRANSACTIONS,
      variables: {
        limit: payload.data.limit,
        skip: payload.data.skip,
        search: payload.data.search,
        sort: payload.data.sort,
      },
    });
    if (errors && errors[0].message === 'Token expired')
      yield put(updateSessionExpired(true));
    else {
      yield put(
        getUserTransactionsSuccess({
          userLogs: findUserTransactionsGrid,
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeEvery(getUserTransactions, handler);
}
