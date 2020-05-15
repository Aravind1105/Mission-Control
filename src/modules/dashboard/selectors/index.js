import { createSelector } from 'reselect';

export const getSalesStatisticState = state => state.dashboard.salesStat;

export const getStatisticProductsListState = state =>
  state.dashboard.salesStatProducts;
