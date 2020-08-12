export const getSalesStatisticState = state => state.dashboard.salesStat;

export const getStatisticProductsListState = state =>
  state.dashboard.salesStatProducts;

export const getWidgetDataState = state => {
  const {
    totalNumberOfCustomers,
    totalNumberOfProducts,
    totalNetIncome,
    totalGrossIncome,
    totalMonthlyNetIncome,
    totalMonthlyGrossIncome,
  } = state.dashboard.widgetData;
  return {
    totalNumberOfCustomers,
    totalNumberOfProducts,
    totalNetIncome: totalNetIncome.toFixed(2),
    totalGrossIncome: totalGrossIncome.toFixed(2),
    totalMonthlyNetIncome: totalMonthlyNetIncome.toFixed(2),
    totalMonthlyGrossIncome: totalMonthlyGrossIncome.toFixed(2),
  };
};
