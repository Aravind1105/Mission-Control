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
