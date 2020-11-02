import gql from 'graphql-tag';

export const userDetailOnUser = gql`
  fragment userDetail on User {
    _id
    status
    firstName
    lastName
    root
    avatarUrl
    email
    mobile
    membercards
    address {
        name
        line1
        line2
        postalCode
        city
        state
        country
        }
    rolesInOrganizations {
      organizationId {
        _id
        name
      }
      role
    }
    paymentMethods {
      _id
      provider
      type
      stripeCustomerId
      last4digits
      default
      created
      updated
    }
    kiosks{
        _id
        notes
        pin
      }
  }
`;

export const GET_ONE_USER_WITH_INFO = gql`
  query($id: String!) {
    getOneUserWithInfo(id: $id) {
      ...userDetail
    }
  }
  ${userDetailOnUser}
`;

export const GET_USER_TRANSACTIONS = gql`
  query findAllTransactions($id: String!) {
    findAllTransactions(userId: $id) {
      _id
    type
    total
    created
    itemsPurchased{
      _id
      productLine{
        name
      }
      price
      loadCell
    }
    paymentMethod{
      isPaid
      membercardId
      amount
      stripeCustomerId
    }
    session{
       kiosk{
        name
      }
      details{
        touchedArticles{
          ean
        }
        paymentCardDetails
        membercardId
        sessionClosedAt
      }
    }
  }
}
`;

export const GET_USERS_SHORT_INFO_QUERY = gql`
  query($data: GridRequest) {
    getAllUsersGrid(data: $data) {
      total
      data {
        _id
        status
        firstName
        lastName
        root
        avatarUrl
        email
        mobile
        membercards
        address {
        name
        line1
        line2
        postalCode
        city
        state
        country
        }
        rolesInOrganizations {
          organizationId {
            name
          }
          role
        }
        paymentMethods{
        _id
        type
        provider
        last4digits
      }
      kiosks{
        _id
        notes
        pin
      }
      }
    }
  }
`;

export const USER_ROLE_TOGGLE_MUTATION = gql`
  mutation toggleRole($data: GrantRootForUserInput!) {
    grantRootForUser(data: $data) {
      ...userDetail
    }
  }
  ${userDetailOnUser}
`;

export const ADD_MEMBER_CARD_ID_FOR_USER_MUTATION = gql`
  mutation addMembercardIdForUser($data: MembercardIdInput!) {
    addMembercardIdForUser(data: $data) {
      ...userDetail
    }
  }
  ${userDetailOnUser}
`;

export const DELETE_MEMBER_CARD_ID_FOR_USER_MUTATION = gql`
  mutation deleteMembercardIdForUser($data: MembercardIdInput!) {
    deleteMembercardIdForUser(data: $data) {
      ...userDetail
    }
  }
  ${userDetailOnUser}
`;

export default {};
