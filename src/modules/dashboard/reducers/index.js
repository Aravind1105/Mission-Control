import { handleActions, combineActions } from 'redux-actions';
import { getSalesStatistic, getSalesStatisticSuccess, getWidgetTodayData, getWidgetTodayDataSuccess, getWidgetMonthlyData, getWidgetMonthlyDataSuccess } from '../actions';

const initialState = {
  salesStat: [],
  salesStatProducts: [],
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
      salesStat: payload.statistic,
      salesStatProducts: payload.products,
      isSalesStatLoading: false,
    }),
    [combineActions(getWidgetTodayData, getWidgetMonthlyData)]: state => ({
      ...state,
      isSalesStatLoading: true,
    }),
    [combineActions(getWidgetTodayDataSuccess, getWidgetMonthlyDataSuccess)]: (state, { payload }) => ({
      ...state,
      widgetData: { ...state.widgetData, ...payload },
      isSalesStatLoading: false,
    }),
  },
  initialState,
);

export default dashboard;
