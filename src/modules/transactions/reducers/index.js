import { handleActions, combineActions } from 'redux-actions';
import moment from 'moment';

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
  setSalesPage,
  setSalesPerPage,
  setSalesKiosk,
  setSalesFilter,
  setSalesSort,
  setRefillsPage,
  setRefillsPerPage,
  setRefillsKiosk,
  setRefillsFilter,
  setRefillsSort,
  setProductsPage,
  setProductsPerPage,
  setProductsKiosk,
  setProductsFilter,
  setProductsSort,
  setProducts,
} from '../actions';

const startOfMonth = moment()
  .startOf('month')
  .toDate();
const currentDay = new Date();
const date = [startOfMonth, currentDay];

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
  salesPagination: {
    kiosk: [],
    page: 0,
    perPage: 25,
    sort: [
      {
        column: 'created',
        direction: 'DESC',
      },
    ],
    filter: {
      kiosk: [],
    },
  },
  refillsPagination: {
    kiosk: [],
    page: 0,
    perPage: 25,
    sort: [
      {
        column: 'created',
        direction: 'DESC',
      },
    ],
    filter: {
      kiosk: [],
    },
  },
  productsPagination: {
    kiosk: [],
    product: '',
    page: 0,
    perPage: 25,
    sort: [
      {
        column: 'sold',
        direction: 'DESC',
      },
    ],
    filter: {
      kiosk: [],
      product: '',
    },
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
    [setSalesPage]: (state, { payload }) => ({
      ...state,
      salesPagination: { ...state.salesPagination, page: payload },
    }),
    [setSalesPerPage]: (state, { payload }) => ({
      ...state,
      salesPagination: { ...state.salesPagination, perPage: payload },
    }),
    [setSalesKiosk]: (state, { payload }) => ({
      ...state,
      salesPagination: { ...state.salesPagination, kiosk: payload },
    }),
    [setSalesFilter]: (state, { payload }) => ({
      ...state,
      salesPagination: { ...state.salesPagination, filter: payload },
    }),
    [setSalesSort]: (state, { payload }) => ({
      ...state,
      salesPagination: { ...state.salesPagination, sort: payload },
    }),

    [setRefillsPage]: (state, { payload }) => ({
      ...state,
      refillsPagination: { ...state.refillsPagination, page: payload },
    }),
    [setRefillsPerPage]: (state, { payload }) => ({
      ...state,
      refillsPagination: { ...state.refillsPagination, perPage: payload },
    }),
    [setRefillsKiosk]: (state, { payload }) => ({
      ...state,
      refillsPagination: { ...state.refillsPagination, kiosk: payload },
    }),
    [setRefillsFilter]: (state, { payload }) => ({
      ...state,
      refillsPagination: { ...state.refillsPagination, filter: payload },
    }),
    [setRefillsSort]: (state, { payload }) => ({
      ...state,
      refillsPagination: { ...state.refillsPagination, sort: payload },
    }),

    [setProducts]: (state, { payload }) => ({
      ...state,
      productsPagination: { ...state.productsPagination, product: payload },
    }),
    [setProductsPage]: (state, { payload }) => ({
      ...state,
      productsPagination: { ...state.productsPagination, page: payload },
    }),
    [setProductsPerPage]: (state, { payload }) => ({
      ...state,
      productsPagination: { ...state.productsPagination, perPage: payload },
    }),
    [setProductsKiosk]: (state, { payload }) => ({
      ...state,
      productsPagination: { ...state.productsPagination, kiosk: payload },
    }),
    [setProductsFilter]: (state, { payload }) => ({
      ...state,
      productsPagination: { ...state.productsPagination, filter: payload },
    }),
    [setProductsSort]: (state, { payload }) => ({
      ...state,
      productsPagination: { ...state.productsPagination, sort: payload },
    }),
  },
  initialState,
);

export default transactionsReducer;
