import { createAction } from 'redux-actions';

// Saga actions
export const getSalesStatistic = createAction('@@saga/GET_SALES_STATISTIC');
export const getWidgetTodayData = createAction('@@saga/GET_WIDGET_TODAY_DATA');
export const getWidgetMonthlyData = createAction(
  '@@saga/GET_WIDGET_MONTHLY_DATA',
);

// State actions
export const setAlertDate = createAction('@@state/SET_ALERT_DATE');
export const setAlertPage = createAction('@@state/SET_ALERT_PAGE');
export const setAlertPerPage = createAction('@@state/SET_ALERT_PER_PAGE');
export const setAlertKiosk = createAction('@@state/SET_ALERT_KIOSK');
export const setAlert = createAction('@@state/SET_ALERT');
export const setAlertFilters = createAction('@@state/SET_ALERT_FILTERS');
export const setAlertSort = createAction('@@state/SET_ALERT_SORT');

export const getSalesStatisticSuccess = createAction(
  '@@state/GET_SALES_STATISTIC_SUCCESS',
);
export const getWidgetTodayDataSuccess = createAction(
  '@@state/GET_WIDGET_TODAY_DATA_SUCCESS',
);
export const getWidgetMonthlyDataSuccess = createAction(
  '@@state/GET_WIDGET_MONTHLY_DATA_SUCCESS',
);
