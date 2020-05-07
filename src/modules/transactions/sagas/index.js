import { fork, all } from 'redux-saga/effects';

import getAllTransactionsSaga from './getAllTransactions';

export default function* transactionsSaga() {
  yield all([fork(getAllTransactionsSaga)]);
}
