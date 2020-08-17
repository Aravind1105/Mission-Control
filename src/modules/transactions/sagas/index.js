import { fork, all } from 'redux-saga/effects';

import getAllTransactionsSaga from './getAllTransactions';
import createRefill from './createRefill';
import getGridRefills from './gridRefills';
import exportCsvSales from './exportCsvSales';
import exportCsvRefills from './exportCsvRefills';
import getTransactionsWidgetsData from './getTransactionsWidgetsData';
import getRefillsWidgetsData from './getRefillsWidgetsData';

export default function* transactionsSaga() {
  yield all([
    fork(createRefill),
    fork(getAllTransactionsSaga),
    fork(getGridRefills),
    fork(exportCsvSales),
    fork(exportCsvRefills),
    fork(getTransactionsWidgetsData),
    fork(getRefillsWidgetsData),
  ]);
}
