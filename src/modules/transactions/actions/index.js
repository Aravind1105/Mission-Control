import { createAction } from 'redux-actions';

export const getAllTransactions = createAction('@@saga/GET_ALL_TRANSACTIONS');
export const getGridRefills = createAction('@@saga/GRID_REFILLS');
export const createRefill = createAction('@@saga/CREATE_REFILL');

export const getAllTransactionsSuccess = createAction(
  '@@state/GET_ALL_TRANSACTIONS_SUCCESS',
);
export const getAllTransactionsFailed = createAction(
  '@@state/GET_ALL_TRANSACTIONS_FAILED',
);

export const getGridRefillsSuccess = createAction(
  '@@state/GRID_REFILLS_SUCCESS',
);
export const getGridRefillsFailed = createAction('@@state/GRID_REFILLS_FAILED');
