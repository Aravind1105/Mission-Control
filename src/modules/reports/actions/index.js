import { createAction } from 'redux-actions';

// Saga actions
export const getReports = createAction('@@saga/GET_REPORTS');

// State actions
export const getReportsSuccess = createAction('@@state/GET_REPORTS_SUCCESS');
