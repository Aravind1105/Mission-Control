import { createAction } from 'redux-actions';

// Saga actions
export const getWidgetData = createAction('@@saga/GET_WIDGET_DATA');
export const getTopSellingKiosks = createAction(
  '@@saga/GET_TOP_SELLING_KIOSKS',
);

// State actions
export const getWidgetDataSuccess = createAction(
  '@@state/GET_WIDGET_DATA_SUCCESS',
);

export const getNetSalesProfitNetCostData = createAction(
  '@@saga/GET_NET_SALES_PROFIT_COST_DATA',
);

export const getNetSalesProfitCostDataSuccess = createAction(
  '@@state/GET_NET_SALES_PROFIT_COST_DATA_SUCCESS',
);
export const getTopSellingKiosksSuccess = createAction(
  '@@state/GET_TOP_SELLING_KIOSKS_SUCCESS',
);

// Action For Top Selling Products Grid
export const getTopSellingProducts = createAction(
  '@@saga/GET_TOP_SELLING_PRODUCTS',
);
export const getTopSellingProductsSuccess = createAction(
  '@@state/GET_TOP_SELLING_PRODUCTS_SUCCESS',
);
export const getTopRefills = createAction('@@saga/GET_TOP_REFILLS');

// Action For Top Selling Products BarChart
export const getTopSellHours = createAction('@@saga/GET_TOP_SELL_HOURS');
export const getTopSellHoursSuccess = createAction(
  '@@state/GET_TOP_SELL_HOURS_SUCCESS',
);

// Action For Payment Methods PeiChart
export const getPaymentsMethodsStats = createAction(
  '@@saga/GET_PAYMENTS_METHODS_STATS',
);
export const getPaymentsMethodsStatsSuccess = createAction(
  '@@state/GET_PAYMENTS_METHODS_STATS_SUCCESS',
);

export const getTopRefillsSuccess = createAction(
  '@@state/GET_TOP_REFILLS_SUCCESS',
);
