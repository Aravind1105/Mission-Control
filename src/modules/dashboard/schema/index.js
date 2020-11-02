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

export const GET_WIDGET_TODAY_DATA = gql`
  query ($period: Period!) {
    getTotalNumberOfTransactions(period: $period)
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

export const GET_SALES_STATISTICS_DATA = gql`
query {
  salesByKiosk {
        weekDays { _id { date kiosk { _id name } } amount }
        last7Days { _id { date kiosk { _id name } } amount }
        last24Hours { _id { date kiosk { _id name } } amount }
        monthly { _id { date kiosk { _id name } } amount }
        last30Days { _id { date kiosk { _id name } } amount }
        hourly { _id { date kiosk { _id name } } amount }
        minutely { _id { date kiosk { _id name } } amount }
    }
}
`;


