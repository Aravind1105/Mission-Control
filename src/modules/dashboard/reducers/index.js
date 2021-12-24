import { handleActions, combineActions } from 'redux-actions';
import {
  getSalesStatistic,
  getSalesStatisticSuccess,
  getWidgetTodayData,
  getWidgetTodayDataSuccess,
  getWidgetMonthlyData,
  getWidgetMonthlyDataSuccess,
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
  },
  initialState,
);

export default dashboard;
