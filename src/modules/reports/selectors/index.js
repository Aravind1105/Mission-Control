import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getWidgetDataState = state => state.reports.widgetData;

export const getTopSellingKiosksState = createSelector(
  state => state.reports.topSellingKiosks,
  data =>
    data.map(row => {
      row['netSales'] = row['netSales'].toFixed(2);
      row['netCost'] = row['netCost'].toFixed(2);
      return row;
    }),
);
