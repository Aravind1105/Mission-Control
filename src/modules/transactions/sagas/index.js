import { fork, all } from 'redux-saga/effects';

import getAllTransactionsSaga from './getAllTransactions';
import getAllProductsSaga from './getAllProducts';
import createRefill from './createRefill';
import getGridRefills from './gridRefills';
import exportCsvSales from './exportCsvSales';
import exportCsvRefills from './exportCsvRefills';
import getTransactionsWidgetsData from './getTransactionsWidgetsData';
import getRefillsWidgetsData from './getRefillsWidgetsData';
import getProductsWidgetsData from './getProductsWidgetsData';
import { exportCsvProducts } from '../actions';

export default function* transactionsSaga() {
  yield all([
    fork(createRefill),
    fork(getAllTransactionsSaga),
    fork(getAllProductsSaga),
    fork(getGridRefills),
    fork(exportCsvSales),
    fork(exportCsvRefills),
    fork(exportCsvProducts),
    fork(getTransactionsWidgetsData),
    fork(getRefillsWidgetsData),
    fork(getProductsWidgetsData),
  ]);
}
