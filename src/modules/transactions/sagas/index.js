import { fork, all } from 'redux-saga/effects';

import getAllTransactionsSaga from './getAllTransactions';
import createRefill from './createRefill';
import getGridRefills from './gridRefills';
import exportCsv from './exportCsv';

export default function* transactionsSaga() {
  yield all([
    fork(createRefill),
    fork(getAllTransactionsSaga),
    fork(getGridRefills),
    fork(exportCsv),
  ]);
}
