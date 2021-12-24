import { handleActions, combineActions } from 'redux-actions';

import {
  getAllTransactions,
  getAllTransactionsSuccess,
  getAllTransactionsFailed,
  getAllProducts,
  getAllProductsSuccess,
  getAllProductsFailed,
  getGridRefills,
  getGridRefillsSuccess,
  getGridRefillsFailed,
  getTransactionsWidgetsData,
  getTransactionsWidgetsDataSuccess,
  getRefillsWidgetsData,
  getRefillsWidgetsDataSuccess,
  getProductsWidgetsData,
  getProductsWidgetsDataSuccess,
} from '../actions';

const initialState = {
  list: [],
  refillsList: [],
  productList: [],
  totalRefills: 0,
  totalTransactions: 0,
  totalProducts: 0,
  isLoading: false,
  isWidgetsLoading: false,
  widgetData: {
    totalNumberOfProductsAdded: 0,
    totalGrossValueOfRefills: 0,
    totalNumberOfProductsRemoved: 0,
    averageSpoilageRate: 0,
    totalNumberOfTransactions: 0,
    averagePurchaseValue: 0,
    totalNumberOfProductsSold: 0,
    totalNetIncome: 0,
    mostSoldProductName: {},
    mostSoldProductValue: 0,
    leastSoldProductName: {},
    leastSoldProductValue: 0,
    mostRefilledProductName: {},
    mostRefilledProductValue: 0,
    mostRemovedProductName: {},
    mostRemovedProductValue: 0,
  },
};

const transactionsReducer = handleActions(
  {
    [combineActions(
      getAllTransactions,
      getGridRefills,
      getAllProducts,
    )]: state => ({
      ...state,
      isLoading: true,
    }),
    [getGridRefillsSuccess]: (state, { payload }) => ({
      ...state,
      refillsList: payload.refillsList,
      totalRefills: payload.totalRefills || 0,
      isLoading: false,
    }),
    [getAllProductsSuccess]: (state, { payload }) => ({
      ...state,
      productList: payload.productList,
      totalProducts: payload.totalProducts || 0,
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
      getAllProductsFailed,
    )]: state => ({
      ...state,
      isLoading: false,
    }),
    [combineActions(
      getTransactionsWidgetsData,
      getRefillsWidgetsData,
      getProductsWidgetsData,
    )]: state => ({
      ...state,
      isWidgetsLoading: true,
    }),
    [combineActions(
      getTransactionsWidgetsDataSuccess,
      getRefillsWidgetsDataSuccess,
      getProductsWidgetsDataSuccess,
    )]: (state, { payload }) => ({
      ...state,
      isWidgetsLoading: false,
      widgetData: {
        ...state.widgetData,
        ...payload,
      },
    }),
  },
  initialState,
);

export default transactionsReducer;
