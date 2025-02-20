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
      rank
      amount
      netSales
      netCost
      profit
      __typename
    }
  }
`;

export const GET_TOP_SELL_HOURS = gql`
  query($period: Period!, $kioskIds: [String]) {
    getTopSellHours(period: $period, kioskIds: $kioskIds) {
      amount
      key
    }
    getTopSellWeek(period: $period, kioskIds: $kioskIds) {
      amount
      key
    }
  }
`;

export const GET_TOP_REFILLS = gql`
  query($period: Period!, $kioskIds: [String]) {
    getTopRefillsWeek(period: $period, kioskIds: $kioskIds) {
      amount
      key
      grouping
    }
    getTopRefillsHour(period: $period, kioskIds: $kioskIds) {
      amount
      key
      grouping
    }
  }
`;

export const GET_PAYMENTS_METHODS_STATS = gql`
  query($period: Period!, $kioskIds: [String]) {
    getPaymentsMethodsStats(period: $period, kioskIds: $kioskIds) {
      _id
      cnt
    }
  }
`;

export default {};
