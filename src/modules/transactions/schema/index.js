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
        paymentMethod {
          membercardId
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

export const GRID_REFILLS_QUERY = gql`
  query($data: GridRequest) {
    gridRefills(data: $data) {
      total
      data {
        _id
        created
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
  query($period: Period!, $kioskId: ID) {
    getTotalNumberOfProductsAdded(period: $period, kioskId: $kioskId)
    getTotalGrossValueOfRefills(period: $period, kioskId: $kioskId)
    getTotalNumberOfProductsRemoved(period: $period, kioskId: $kioskId)
    getAverageSpoilageRate(period: $period, kioskId: $kioskId)
  }
`;

export const GET_TRANSACTIONS_WIDGET_DATA = gql`
  query($period: Period!, $kioskId: ID) {
    getTotalNumberOfTransactions(period: $period, kioskId: $kioskId)
    getAveragePurchaseValue(period: $period, kioskId: $kioskId)
    getTotalNumberOfProductsSold(period: $period, kioskId: $kioskId)
    getTotalNetIncome(period: $period, kioskId: $kioskId)
    getTotalGrossIncome(period: $period, kioskId: $kioskId)
  }
`;

export default {};
