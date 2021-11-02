import { handleActions } from 'redux-actions';

import {
  getWidgetData,
  getWidgetDataSuccess,
  getNetSalesProfitNetCostData,
  getNetSalesProfitCostDataSuccess,
  getTopSellingKiosksSuccess,
  getTopSellingProductsSuccess,
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
  },
  initialState,
);

export default reportsReducer;
