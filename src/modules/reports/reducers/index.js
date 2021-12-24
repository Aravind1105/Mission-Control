import { handleActions } from 'redux-actions';

import {
  getWidgetData,
  getWidgetDataSuccess,
  getNetSalesProfitNetCostData,
  getNetSalesProfitCostDataSuccess,
  getTopSellingKiosks,
  getTopSellingKiosksSuccess,
  getTopSellingProducts,
  getTopSellingProductsSuccess,
  getTopSellSuccess,
  getTopRefillsSuccess,
  getTopRefills,
  getPaymentsMethodsStats,
  getPaymentsMethodsStatsSuccess,
  getTopSell,
} from '../actions';

const initialState = {
  widgetData: {
    totalNumberOfProductsSold: 0,
    totalNetIncome: 0,
    averageDailyRevenue: 0,
    peakSalesHour: {
      start: 0,
      end: 0,
    },
  },
  isWidgetLoading: false,
  netSalesProfitCostData: [],
  isNetSalesLoading: false,
  topSellingKiosks: [],
  isTopSellKiosksLoading: false,
  topSellingProducts: [],
  isTopSellProductsLoading: false,
  topSellHours: [],
  topSellWeek: [],
  isTopSellLoading: false,
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
      isWidgetLoading: true,
    }),
    [getWidgetDataSuccess]: (state, { payload }) => ({
      ...state,
      widgetData: payload,
      isWidgetLoading: false,
    }),
    [getNetSalesProfitNetCostData]: state => ({
      ...state,
      isNetSalesLoading: true,
    }),
    [getNetSalesProfitCostDataSuccess]: (state, { payload }) => ({
      ...state,
      netSalesProfitCostData: payload.netSalesProfitCostData,
      isNetSalesLoading: false,
    }),
    [getTopSellingKiosks]: state => ({
      ...state,
      isTopSellKiosksLoading: true,
    }),
    [getTopSellingKiosksSuccess]: (state, { payload }) => ({
      ...state,
      topSellingKiosks: payload.topSellingKiosks,
      isTopSellKiosksLoading: false,
    }),
    [getTopSellingProducts]: state => ({
      ...state,
      isTopSellProductsLoading: true,
    }),
    [getTopSellingProductsSuccess]: (state, { payload }) => ({
      ...state,
      topSellingProducts: payload.topSellingProducts,
      isTopSellProductsLoading: false,
    }),
    [getTopSell]: state => ({
      ...state,
      isTopSellLoading: true,
    }),
    [getTopSellSuccess]: (state, { payload }) => ({
      ...state,
      isTopSellLoading: false,
      topSellHours: payload.topSellHours,
      topSellWeek: payload.topSellWeek,
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
