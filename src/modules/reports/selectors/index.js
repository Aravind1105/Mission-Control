import { createSelector } from 'reselect';

export const getWidgetDataState = state => state.reports.widgetData;

export const getNetSalesProfitCostState = state =>
  state.reports.netSalesProfitCostData;

export const getTopSellingProductsState = state =>
  state.reports.topSellingProducts;

export const getTopSellState = createSelector(
  state => state.reports,
  data => ({
    daily: data.topSellHours,
    weekly: data.topSellWeek,
  }),
);

export const getPaymentsMethodsState = state =>
  state.reports.paymentMethodsStats;

export const getTopSellingKiosksState = createSelector(
  state => state.reports.topSellingKiosks,
  data =>
    data.map(row => {
      row['netSales'] = row['netSales'].toFixed(2);
      row['netCost'] = row['netCost'].toFixed(2);
      return row;
    }),
);

export const getTopRefillsState = createSelector(
  state => state.reports,
  data => ({
    weekly: data.topRefillsWeek,
    daily: data.topRefillsDay,
  }),
);
