import gql from 'graphql-tag';

export const GET_TRANSACTIONS_QUERY = gql`
  query($data: GridRequest) {
    findAllTransactionsGrid(data: $data) {
      total
      data {
        _id
        created
        total
        session {
          user {
            firstName
            lastName
          }
        }
        itemsPurchased {
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

export default {};
