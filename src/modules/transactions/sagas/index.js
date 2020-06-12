import { fork, all } from 'redux-saga/effects';

import getAllTransactionsSaga from './getAllTransactions';
import createRefill from './createRefill';

export default function* transactionsSaga() {
  yield all([fork(createRefill), fork(getAllTransactionsSaga)]);
}
