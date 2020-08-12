import { handleActions, combineActions } from 'redux-actions';

import {
  getAllTransactions,
  getAllTransactionsSuccess,
  getGridRefills,
  getGridRefillsSuccess,
  getGridRefillsFailed,
  getAllTransactionsFailed,
} from '../actions';

const initialState = {
  list: [],
  refillsList: [],
  totalRefills: 0,
  totalTransactions: 0,
  isLoading: false,
};

const transactionsReducer = handleActions(
  {
    [combineActions(getAllTransactions, getGridRefills)]: state => ({
      ...state,
      isLoading: true,
    }),
    [getGridRefillsSuccess]: (state, { payload }) => ({
      ...state,
      refillsList: payload.refillsList,
      totalRefills: payload.totalRefills || 0,
      isLoading: false,
    }),
    [getAllTransactionsSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.list,
      totalTransactions: payload.totalTransactions || 0,
      isLoading: false,
    }),
    [combineActions(
      getGridRefillsFailed,
      getAllTransactionsFailed,
    )]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

export default transactionsReducer;
