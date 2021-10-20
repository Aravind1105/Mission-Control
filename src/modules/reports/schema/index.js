import gql from 'graphql-tag';

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

export default {};
