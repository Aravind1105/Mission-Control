import { handleActions, combineActions } from 'redux-actions';

import {
  getAllTransactions,
  getAllTransactionsSuccess,
  getGridRefills,
  getGridRefillsSuccess,
  getGridRefillsFailed,
  getAllTransactionsFailed,
  getTransactionsWidgetsDataSuccess,
  getRefillsWidgetsDataSuccess,
} from '../actions';

const initialState = {
  list: [],
  refillsList: [],
  totalRefills: 0,
  totalTransactions: 0,
  isLoading: false,
  widgetData: {
    totalNumberOfProductsAdded: 0,
    totalGrossValueOfRefills: 0,
    totalNumberOfProductsRemoved: 0,
    averageSpoilageRate: 0,
    totalNumberOfTransactions: 0,
    averagePurchaseValue: 0,
    totalNumberOfProductsSold: 0,
    totalNetIncome: 0,
  },
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
    [combineActions(
      getTransactionsWidgetsDataSuccess,
      getRefillsWidgetsDataSuccess,
    )]: (state, { payload }) => ({
      ...state,
      widgetData: { ...state.widgetData, ...payload },
    }),
  },
  initialState,
);

export default transactionsReducer;
