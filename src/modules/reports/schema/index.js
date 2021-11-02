import gql from 'graphql-tag';

export const GET_NET_SALES_PROFIT_COST_DATA = gql`
  query dailyProfitByKiosks($kioskIds: [String], $period: Period) {
    dailyProfitByKiosks(kioskIds: $kioskIds, period: $period) {
      _id
      total_cost
      total_sales
      profit
      __typename
    }
  }
`;
export const GET_REPORTS_WIDGET_DATA = gql`
  query($period: Period!, $kioskId: [String], $kioskIds: [String]) {
    getTotalNetIncome(period: $period, kioskId: $kioskId)
    getTotalNumberOfProductsSold(period: $period, kioskId: $kioskId)
    getAverageDailyNetRevenue(period: $period, kioskIds: $kioskIds)
    getPeakSalesHour(period: $period, kioskIds: $kioskIds) {
      start
      end
      sum
    }
  }
`;

export const GET_TOP_SELLING_KIOSKS = gql`
  query($period: Period!) {
    topSellingKiosks(period: $period) {
      rank
      kioskId
      kioskName
      netSales
      netCost
      profit
    }
  }
`;

export const GET_TOP_SELLING_PRODUCTS = gql`
  query($period: Period!, $kioskIds: [String]) {
    getTopSellingProducts(period: $period, kioskIds: $kioskIds) {
      productLine {
        _id
        name
      }
      amount
      netSales
      netCost
      profit
      __typename
    }
  }
`;

export default {};
