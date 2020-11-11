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
    note
    kioskPin
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
  query findUserTransactionsGrid(
    $skip:Int!,$limit:Int!,$search:String!,$sort:[RequestSort]
  ) {
    findUserTransactionsGrid(data:{skip:$skip,limit:$limit,search:$search,sort:$sort}) {
    total 
    data{
      _id
    total
    created
    itemsPurchased{
      loadCell
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
      type
      kiosk{
        name
      }
      details{
        touchedArticles{
          quantity
          productLine{
            name
            priceHistory{
              price
            }
          }
        }
      }
    }
  }
}
  }
`;

export const GET_USERS_SHORT_INFO_QUERY = gql`
  query($data: UsersGridInput) {
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
        type
        provider
        last4digits
      }
      kiosks{
        _id
        notes
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

export const UPDATE_USER = gql`
  mutation updateUser($id: ID, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
      ...userDetail
    }
  }
  ${userDetailOnUser}
`;

export default {};
