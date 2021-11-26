import { handleActions } from 'redux-actions';

import {
  getWidgetData,
  getWidgetDataSuccess,
  getNetSalesProfitNetCostData,
  getNetSalesProfitCostDataSuccess,
  getTopSellingKiosksSuccess,
  getTopSellingProductsSuccess,
  getTopSellHoursSuccess,
  getTopRefillsSuccess,
  getTopRefills,
  getPaymentsMethodsStats,
  getPaymentsMethodsStatsSuccess,
} from '../actions';

const initialState = {
  isLoading: false,
  widgetData: {
    totalNumberOfProductsSold: 0,
    totalNetIncome: 0,
    averageDailyRevenue: 0,
    peakSalesHour: null,
  },
  netSalesProfitCostData: [],
  topSellingKiosks: [],
  topSellingProducts: [],
  topSellHours: [],
  topRefillsWeek: [],
  topRefillsDay: [],
  isTopRefillsLoading: false,
  paymentMethodsStats: [],
  isPaymentMethodLoading: false,
};

const reportsReducer = handleActions(
  {
    [getWidgetData]: state => ({
      ...state,
      isLoading: true,
    }),
    [getWidgetDataSuccess]: (state, { payload }) => ({
      ...state,
      widgetData: payload,
      isLoading: false,
    }),
    [getNetSalesProfitNetCostData]: state => ({
      ...state,
      isLoading: true,
    }),
    [getNetSalesProfitCostDataSuccess]: (state, { payload }) => ({
      ...state,
      netSalesProfitCostData: payload.netSalesProfitCostData,
      isLoading: false,
    }),
    [getTopSellingKiosksSuccess]: (state, { payload }) => ({
      ...state,
      topSellingKiosks: payload.topSellingKiosks,
    }),
    [getTopSellingProductsSuccess]: (state, { payload }) => ({
      ...state,
      topSellingProducts: payload.topSellingProducts,
    }),
    [getTopSellHoursSuccess]: (state, { payload }) => ({
      ...state,
      topSellHours: payload.topSellHours,
    }),
    [getTopRefills]: state => ({
      ...state,
      isTopRefillsLoading: true,
    }),
    [getTopRefillsSuccess]: (state, { payload }) => ({
      ...state,
      topRefillsWeek: payload.topRefillsWeek,
      topRefillsDay: payload.topRefillsDay,
      isTopRefillsLoading: false,
    }),
    [getPaymentsMethodsStats]: state => ({
      ...state,
      isPaymentMethodLoading: true,
    }),
    [getPaymentsMethodsStatsSuccess]: (state, { payload }) => ({
      ...state,
      paymentMethodsStats: payload.paymentMethodsStats,
      isPaymentMethodLoading: false,
    }),
  },
  initialState,
);

export default reportsReducer;
