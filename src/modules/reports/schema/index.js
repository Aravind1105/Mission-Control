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

export default {};
