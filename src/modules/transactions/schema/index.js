import gql from 'graphql-tag';

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

export const CREATE_REFILL_MUTATION = gql`
  mutation createRefill($kioskId: String!) {
    createRefill(kioskId: $kioskId) {
      _id
      sessionClosedAt
    }
  }
`;

export default {};
