import gql from 'graphql-tag';

const organizationOnRefills = gql`
  fragment organization on Organization {
    _id
    name
    slug
    imageUrl
    description
    eanPrefix
    address {
      type
      properties {
        name
        line1
        line2
        postalCode
        city
        state
        country
      }
      geometry {
        type
        coordinates
      }
    }
  }
`;

export const GET_TRANSACTIONS_QUERY = gql`
  query($data: GridRequest) {
    findAllTransactionsGrid(data: $data) {
      total
      data {
        _id
        created
        total
        type
        userId
        paymentMethod {
          stripeCustomerId
          stripePaymentIntentId
          isPaid
          membercardId
          cardType
        }
        itemsPurchased {
          price
          tax
          productLine {
            _id
            name
            articleNumber
          }
          kiosk {
            _id
            name
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = gql`
  query($data: GridRequest) {
    getProductLinesStatisticsGrid(data: $data) {
      data {
        productLine {
          _id
          name
          defaultPrice
          defaultCost
        }
        totalCost
        totalGrossSales
        totalRemovedCost
        refilled
        sold
        removed
      }
      total
    }
  }
`;

export const GRID_REFILLS_QUERY = gql`
  query($data: GridRequest) {
    gridRefills(data: $data) {
      total
      data {
        _id
        created
        added
        kiosk {
          _id
          name
          organization {
            ...organization
          }
          components {
            manufacturer
            type
            model
          }
        }
        type
        scale {
          cellId
          weight
          refillCost
          productLine {
            _id
            name
            articleNumber
            defaultCost
          }
          count
        }
      }
    }
  }
  ${organizationOnRefills}
`;

export const CREATE_REFILL_MUTATION = gql`
  mutation createRefill($kioskId: String!) {
    createRefill(kioskId: $kioskId) {
      _id
      details {
        sessionClosedAt
      }
    }
  }
`;

export const GET_REFILLS_WIDGET_DATA = gql`
  query($period: Period!, $kioskId: [String]) {
    getTotalNumberOfProductsAdded(period: $period, kioskId: $kioskId)
    getDefaultTotalCostValueOfRefills(period: $period, kioskId: $kioskId)
    getTotalNumberOfProductsRemoved(period: $period, kioskId: $kioskId)
    getAverageSpoilageRate(period: $period, kioskId: $kioskId)
    getDefaultTotalSalesValueOfRefills(period: $period, kioskId: $kioskId)
    getDefaultTotalCostValueOfRefills(period: $period, kioskId: $kioskId)
  }
`;

export const GET_PRODUCTS_WIDGET_DATA = gql`
  query($period: Period!, $kioskId: [String]) {
    getMostSoldProduct(period: $period, kioskId: $kioskId) {
      productLine {
        name
        __typename
      }
      sum
      __typename
    }
    getLeastSoldProduct(period: $period, kioskId: $kioskId) {
      productLine {
        name
      }
      sum
    }
    getMostRefilledProduct(period: $period, kioskId: $kioskId) {
      productLine {
        name
      }
      sum
    }
    getMostRemovedProduct(period: $period, kioskId: $kioskId) {
      productLine {
        name
      }
      sum
    }
  }
`;

export const GET_TRANSACTIONS_WIDGET_DATA = gql`
  query($period: Period!, $kioskId: [String]) {
    getTotalNumberOfTransactions(period: $period, kioskId: $kioskId)
    getAveragePurchaseValue(period: $period, kioskId: $kioskId)
    getTotalNumberOfProductsSold(period: $period, kioskId: $kioskId)
    getTotalNetIncome(period: $period, kioskId: $kioskId)
    getTotalGrossIncome(period: $period, kioskId: $kioskId)
  }
`;

export default {};
