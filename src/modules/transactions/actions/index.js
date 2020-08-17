import { createAction } from 'redux-actions';

export const getAllTransactions = createAction('@@saga/GET_ALL_TRANSACTIONS');
export const getGridRefills = createAction('@@saga/GRID_REFILLS');
export const createRefill = createAction('@@saga/CREATE_REFILL');
export const exportCsvSales = createAction('@@saga/GET_SALES_CSV');
export const exportCsvRefills = createAction('@@saga/GET_REFILLS_CSV');
export const exportCsv = createAction('@@saga/GET_CSV');
export const getTransactionsWidgetsData = createAction(
  '@@saga/GET_TRANSACTIONS_WIDGETS_DATA',
);
export const getRefillsWidgetsData = createAction(
  '@@saga/GET_REFILLS_WIDGETS_DATA',
);

export const getAllTransactionsSuccess = createAction(
  '@@state/GET_ALL_TRANSACTIONS_SUCCESS',
);
export const getAllTransactionsFailed = createAction(
  '@@state/GET_ALL_TRANSACTIONS_FAILED',
);
export const createRefillSuccess = createAction(
  '@@state/CREATE_REFILL_SUCCESS',
);
export const getGridRefillsSuccess = createAction(
  '@@state/GRID_REFILLS_SUCCESS',
);
export const getGridRefillsFailed = createAction('@@state/GRID_REFILLS_FAILED');
export const exportCsvSalesSuccess = createAction(
  '@@state/GRID_SALES_CSV_SUCCESS',
);
export const exportCsvRefillsSuccess = createAction(
  '@@state/GRID_REFILLS_CSV_SUCCESS',
);
export const getTransactionsWidgetsDataSuccess = createAction(
  '@@saga/GET_TRANSACTIONS_WIDGETS_DATA_SUCCESS',
);

export const getRefillsWidgetsDataSuccess = createAction(
  '@@saga/GET_REFILLS_WIDGETS_DATA_SUCCESS',
);
