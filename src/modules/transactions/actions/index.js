import { createAction } from 'redux-actions';

export const getAllTransactions = createAction('@@saga/GET_ALL_TRANSACTIONS');
export const createRefill = createAction('@@saga/CREATE_REFILL');

export const getAllTransactionsSuccess = createAction(
  '@@state/GET_ALL_TRANSACTIONS_SUCCESS',
);
