import { createSelector } from 'reselect';

export const getAllTransactionsState = state => state.transactions.list;

export const getTotalTransactionsCount = state =>
  state.transactions.totalTransactions;
