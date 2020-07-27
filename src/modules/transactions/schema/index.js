import gql from 'graphql-tag';
import { productOnProductLine } from '../../products/schema';

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
        itemsPurchased {
          price
          tax
          productLine {
            _id
            name
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
            name
            defaultPrice
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
      sessionClosedAt
    }
  }
`;

export default {};
