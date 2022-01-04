import { createAction } from 'redux-actions';

// Saga actions
export const getSalesStatistic = createAction('@@saga/GET_SALES_STATISTIC');
export const getWidgetTodayData = createAction('@@saga/GET_WIDGET_TODAY_DATA');
export const getWidgetMonthlyData = createAction(
  '@@saga/GET_WIDGET_MONTHLY_DATA',
);

// State actions
export const setAlertPage = createAction('@@state/SET_ALERT_PAGE');
export const setAlertPerPage = createAction('@@state/SET_ALERT_PER_PAGE');
export const setAlertKiosk = createAction('@@state/SET_ALERT_KIOSK');
export const setAlert = createAction('@@state/SET_ALERT');
export const setAlertFilters = createAction('@@state/SET_ALERT_FILTERS');
export const setAlertSort = createAction('@@state/SET_ALERT_SORT');

export const setAlmostProduct = createAction('@@state/SET_ALMOST_PRODUCT');
export const setAlmostPage = createAction('@@state/SET_ALMOST_PAGE');
export const setAlmostPerPage = createAction('@@state/SET_ALMOST_PER_PAGE');
export const setAlmostKiosk = createAction('@@state/SET_ALMOST_KIOSK');
export const setAlmostSupplier = createAction('@@state/SET_ALMOST_SUPPLIER');
export const setAlmostFilter = createAction('@@state/SET_ALMOST_FILTER');
export const setAlmostSort = createAction('@@state/SET_ALMOST_SORT');

export const getSalesStatisticSuccess = createAction(
  '@@state/GET_SALES_STATISTIC_SUCCESS',
);
export const getWidgetTodayDataSuccess = createAction(
  '@@state/GET_WIDGET_TODAY_DATA_SUCCESS',
);
export const getWidgetMonthlyDataSuccess = createAction(
  '@@state/GET_WIDGET_MONTHLY_DATA_SUCCESS',
);
