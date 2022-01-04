import { handleActions, combineActions } from 'redux-actions';

import {
  getSalesStatistic,
  getSalesStatisticSuccess,
  getWidgetTodayData,
  getWidgetTodayDataSuccess,
  getWidgetMonthlyData,
  getWidgetMonthlyDataSuccess,
  setAlertPage,
  setAlertFilters,
  setAlertKiosk,
  setAlertPerPage,
  setAlertSort,
  setAlert,
  setAlmostPage,
  setAlmostPerPage,
  setAlmostKiosk,
  setAlmostProduct,
  setAlmostSupplier,
  setAlmostFilter,
  setAlmostSort,
} from '../actions';

const initialState = {
  salesStat: [],
  salesStatProducts: [],
  isWidgetsLoading: false,
  isSalesStatLoading: false,
  widgetData: {
    totalNumberOfCustomers: 0,
    totalNumberOfProducts: 0,
    totalGrossIncome: 0,
    totalNetIncome: 0,
    totalMonthlyNetIncome: 0,
    totalMonthlyGrossIncome: 0,
  },
  alertPagination: {
    kiosk: [],
    alert: '',
    page: 0,
    perPage: 25,
    sort: [
      {
        column: 'startDate',
        direction: 'DESC',
      },
    ],
    filters: {
      kiosk: [],
      alert: '',
    },
  },
  almostEmptyPagination: {
    page: 0,
    perPage: 25,
    kiosk: '',
    product: '',
    supplier: '',
    sort: [
      {
        column: 'amount',
        direction: 'ASC',
      },
    ],
    filter: {
      kiosk: '',
      product: '',
      supplier: '',
    },
  },
};

const dashboard = handleActions(
  {
    [getSalesStatistic]: state => ({
      ...state,
      isSalesStatLoading: true,
    }),
    [getSalesStatisticSuccess]: (state, { payload }) => ({
      ...state,
      salesStat: payload.salesByKiosk,
      salesStatProducts: payload.products,
      isSalesStatLoading: false,
    }),
    [combineActions(getWidgetTodayData, getWidgetMonthlyData)]: state => ({
      ...state,
      isWidgetsLoading: true,
    }),
    [combineActions(getWidgetTodayDataSuccess, getWidgetMonthlyDataSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      widgetData: { ...state.widgetData, ...payload },
      isWidgetsLoading: false,
    }),
    [setAlert]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, alert: payload },
    }),
    [setAlertPage]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, page: payload },
    }),
    [setAlertPerPage]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, perPage: payload },
    }),
    [setAlertKiosk]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, kiosk: payload },
    }),
    [setAlertFilters]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, filters: payload },
    }),
    [setAlertSort]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, sort: payload },
    }),

    [setAlmostPage]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: { ...state.almostEmptyPagination, page: payload },
    }),
    [setAlmostPerPage]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: {
        ...state.almostEmptyPagination,
        perPage: payload,
      },
    }),
    [setAlmostKiosk]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: { ...state.almostEmptyPagination, kiosk: payload },
    }),
    [setAlmostProduct]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: {
        ...state.almostEmptyPagination,
        product: payload,
      },
    }),
    [setAlmostSupplier]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: {
        ...state.almostEmptyPagination,
        supplier: payload,
      },
    }),
    [setAlmostFilter]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: {
        ...state.almostEmptyPagination,
        filter: payload,
      },
    }),
    [setAlmostSort]: (state, { payload }) => ({
      ...state,
      almostEmptyPagination: { ...state.almostEmptyPagination, sort: payload },
    }),
  },
  initialState,
);

export default dashboard;
