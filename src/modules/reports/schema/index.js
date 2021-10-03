import gql from 'graphql-tag';

export const GET_REPORTS_WIDGET_DATA = gql`
  query($period: Period!, $kioskId: [String]) {
    getTotalNetIncome(period: $period, kioskId: $kioskId)
    getTotalNumberOfProductsSold(period: $period, kioskId: $kioskId)
  }
`;

export default {};
