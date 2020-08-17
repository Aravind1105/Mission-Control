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
    totalNumberOfCustomers: totalNumberOfCustomers || 0,
    totalNumberOfProducts: totalNumberOfProducts || 0,
    totalNetIncome: Number(totalNetIncome || 0).toFixed(2),
    totalGrossIncome: Number(totalGrossIncome || 0).toFixed(2),
    totalMonthlyNetIncome: Number(totalMonthlyNetIncome || 0).toFixed(2),
    totalMonthlyGrossIncome: Number(totalMonthlyGrossIncome || 0).toFixed(2),
  };
};
