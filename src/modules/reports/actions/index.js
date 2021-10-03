import { createAction } from 'redux-actions';

// Saga actions
export const getWidgetData = createAction('@@saga/GET_WIDGET_DATA');

// State actions
export const getWidgetDataSuccess = createAction(
  '@@state/GET_WIDGET_DATA_SUCCESS',
);
