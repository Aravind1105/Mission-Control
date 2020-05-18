import { createAction } from 'redux-actions';

// Saga actions
export const getSalesStatistic = createAction('@@saga/GET_SALES_STATISTIC');

// State actions
export const getSalesStatisticSuccess = createAction(
  '@@state/GET_SALES_STATISTIC_SUCCESS',
);
