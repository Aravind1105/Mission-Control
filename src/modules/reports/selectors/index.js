import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getWidgetDataState = state => state.reports.widgetData;
