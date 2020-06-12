import { call, takeLatest } from 'redux-saga/effects';

import gqlTransactions from 'lib/https/gqlTransactions';
import { createRefill as action } from '../actions';
import { CREATE_REFILL_MUTATION } from '../schema';

function* handler({ payload }) {
  try {
    const variables = {
      kioskId: payload,
    };
    yield call(gqlTransactions.mutate, {
      mutation: CREATE_REFILL_MUTATION,
      variables,
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield takeLatest(action, handler);
}
