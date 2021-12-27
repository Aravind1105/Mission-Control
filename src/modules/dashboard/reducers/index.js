import { handleActions, combineActions } from 'redux-actions';
import moment from 'moment';
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
  setAlertDate,
} from '../actions';

const startOfMonth = moment()
  .startOf('month')
  .toDate();
const currentDay = new Date();
const date = [startOfMonth, currentDay];

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
    dateRange: {
      $gte: date[0],
      $lte: date[1],
    },
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
      dateRange: {
        $gte: date[0],
        $lte: date[1],
      },
      kiosk: [],
      alert: '',
    },
  },
  almostEmptyPagination: {
    page: 0,
    perPage: 25,
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
    [setAlertDate]: (state, { payload }) => ({
      ...state,
      alertPagination: { ...state.alertPagination, dateRange: payload },
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
  },
  initialState,
);

export default dashboard;
