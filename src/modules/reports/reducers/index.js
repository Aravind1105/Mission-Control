import { handleActions } from 'redux-actions';

import {
  getWidgetData,
  getWidgetDataSuccess,
  getNetSalesProfitNetCostData,
  getNetSalesProfitCostDataSuccess,
  getTopSellingKiosksSuccess,
  getTopSellingProductsSuccess,
  getTopSellSuccess,
  getTopRefillsSuccess,
  getTopRefills,
  getPaymentsMethodsStats,
  getPaymentsMethodsStatsSuccess,
  getTopSell,
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
