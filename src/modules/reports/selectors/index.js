import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getReports = state => state.reports;

export const getSalesListReports = createSelector(getReports, ({ data }) => {
  const { lastMonth = [], income = [], totalRevenue = [] } = data || {};
  return { lastMonth, income, totalRevenue };
});

export const getTargetStatistics = createSelector(getReports, ({ data }) => {
  const { income = 0, expenses = 0, spending = 0, total = 0 } = get(
    data,
    'targetStatistics',
    {},
  );
  return { income, expenses, spending, total };
});

export const getTargetSales = createSelector(getReports, ({ data }) => {
  const { targetSales } = data || {};
  return targetSales;
});

export const getPortfolioStatistic = createSelector(getReports, ({ data }) => {
  const { portfolioStatistic = null } = data || {};
  return portfolioStatistic;
});

export const getTopSellers = createSelector(getReports, ({ data }) => {
  const { sellers = null } = data || {};
  return sellers;
});

export const getBestSellingProducts = createSelector(getReports, ({ data }) => {
  const { bestSellingProducts = null } = data || {};
  return bestSellingProducts;
});
