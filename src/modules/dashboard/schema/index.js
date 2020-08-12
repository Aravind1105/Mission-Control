import gql from 'graphql-tag';

const FragmentStatisticOnSalesByFridgeId = gql`
  fragment FragmentStatistic on SalesByFridgeId {
    type
    week
    kiosk
    date
    line {
      _id
      name
    }
  }
`;

const FragmentStatisticOnSalesForAll = gql`
  fragment FragmentStatistic on SalesByFridgeId {
    type
    date
    week
    kiosk
    line {
      _id
      name
    }
  }
`;

export const GET_HOURLY_SALES_STATISTIC_QUERY = gql`
  query getStatistic($kioskId: String) {
    hourlySalesByKiosk(kioskId: $kioskId) {
      _id {
        ...FragmentStatistic
      }
      amount
    }
  }
  ${FragmentStatisticOnSalesByFridgeId}
`;

export const GET_DAILY_SALES_STATISTIC_QUERY = gql`
  query getStatistic($kioskId: String) {
    dailySalesByKiosk(kioskId: $kioskId) {
      _id {
        ...FragmentStatistic
      }
      amount
    }
  }
  ${FragmentStatisticOnSalesByFridgeId}
`;

export const GET_WEEKLY_SALES_STATISTIC_QUERY = gql`
  query getStatistic($kioskId: String) {
    weeklySalesByKiosk(kioskId: $kioskId) {
      _id {
        ...FragmentStatistic
      }
      amount
    }
  }
  ${FragmentStatisticOnSalesByFridgeId}
`;

export const GET_MONTHLY_SALES_STATISTIC_QUERY = gql`
  query getStatistic($kioskId: String) {
    monthlySalesByKiosk(kioskId: $kioskId) {
      _id {
        ...FragmentStatistic
      }
      amount
    }
  }
  ${FragmentStatisticOnSalesByFridgeId}
`;

export const GET_DAILY_SALES_BY_KIOSKS = gql`
  query getStatistic {
    hourlySales {
      _id {
        ...FragmentStatistic
      }
      amount
    }
  }
  ${FragmentStatisticOnSalesForAll}
`;

export const GET_WEEKLY_SALES_BY_KIOSKS = gql`
  query getStatistic {
    dailySales {
      _id {
        ...FragmentStatistic
      }
      amount
    }
  }
  ${FragmentStatisticOnSalesForAll}
`;

export const GET_WIDGET_TODAY_DATA = gql`
  query ($period: Period!) {
    getTotalNumberOfCustomers(period: $period)
    getTotalNumberOfProductsSold(period: $period)
    getTotalGrossIncome(period: $period)
    getTotalNetIncome(period: $period)
  }
`;

export const GET_WIDGET_MONTHLY_DATA = gql`
  query ($period: Period!) {
    getTotalGrossIncome(period: $period)
    getTotalNetIncome(period: $period)
  }
`;
