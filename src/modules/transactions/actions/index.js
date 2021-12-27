import { createAction } from 'redux-actions';

export const getAllTransactions = createAction('@@saga/GET_ALL_TRANSACTIONS');
export const getAllProducts = createAction('@@saga/GET_ALL_PRODUCTS');
export const getGridRefills = createAction('@@saga/GRID_REFILLS');
export const createRefill = createAction('@@saga/CREATE_REFILL');
export const exportCsvSales = createAction('@@saga/GET_SALES_CSV');
export const exportCsvRefills = createAction('@@saga/GET_REFILLS_CSV');
export const exportCsvProducts = createAction('@@saga/GET_PRODUCTS_CSV');
export const exportCsv = createAction('@@saga/GET_CSV');
export const getTransactionsWidgetsData = createAction(
  '@@saga/GET_TRANSACTIONS_WIDGETS_DATA',
);
export const getProductsWidgetsData = createAction(
  '@@saga/GET_PRODUCTS_WIDGET_DATA',
);
export const getRefillsWidgetsData = createAction(
  '@@saga/GET_REFILLS_WIDGETS_DATA',
);
export const getTransactionsWidgetsDataSuccess = createAction(
  '@@saga/GET_TRANSACTIONS_WIDGETS_DATA_SUCCESS',
);
export const getProductsWidgetsDataSuccess = createAction(
  '@@saga/GET_PRODUCTS_WIDGETS_DATA_SUCCESS',
);
export const getRefillsWidgetsDataSuccess = createAction(
  '@@saga/GET_REFILLS_WIDGETS_DATA_SUCCESS',
);

// State actions

export const getAllTransactionsSuccess = createAction(
  '@@state/GET_ALL_TRANSACTIONS_SUCCESS',
);
export const getAllProductsSuccess = createAction(
  '@@state/GET_ALL_PRODUCTS_SUCCESS',
);
export const getAllTransactionsFailed = createAction(
  '@@state/GET_ALL_TRANSACTIONS_FAILED',
);
export const getAllProductsFailed = createAction(
  '@@state/GET_ALL_PRODUCTS_FAILED',
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
export const exportCsvProductsSuccess = createAction(
  '@@state/GRID_PRODUCTS_CSV_SUCCESS',
);
export const setSalesPage = createAction('@@state/SET_SALES_PAGE');
export const setSalesPerPage = createAction('@@state/SET_SALES_PER_PAGE');
export const setSalesDate = createAction('@@state/SET_SALES_DATE');
export const setSalesKiosk = createAction('@@state/SET_SALES_KIOSK');
export const setSalesSort = createAction('@@state/SET_SALES_SORT');
export const setSalesFilter = createAction('@@state/SET_SALES_FILTER');

export const setRefillsPage = createAction('@@state/SET_REFILLS_PAGE');
export const setRefillsPerPage = createAction('@@state/SET_REFILLS_PER_PAGE');
export const setRefillsDate = createAction('@@state/SET_REFILLS_DATE');
export const setRefillsKiosk = createAction('@@state/SET_REFILLS_KIOSK');
export const setRefillsSort = createAction('@@state/SET_REFILLS_SORT');
export const setRefillsFilter = createAction('@@state/SET_REFILLS_FILTER');

export const setProductsPage = createAction('@@state/SET_PRODUCTS_TXN_PAGE');
export const setProductsPerPage = createAction(
  '@@state/SET_PRODUCTS_TXN_PER_PAGE',
);
export const setProductsDate = createAction('@@state/SET_PRODUCTS_TXN_DATE');
export const setProductsKiosk = createAction('@@state/SET_PRODUCTS_TXN_KIOSK');
export const setProductsSort = createAction('@@state/SET_PRODUCTS_TXN_SORT');
export const setProductsFilter = createAction(
  '@@state/SET_PRODUCTS_TXN_FILTER',
);
export const setProducts = createAction('@@state/SET_PRODUCTS_TXN');
