import gql from 'graphql-tag';

export const userDetailOnUser = gql`
  fragment userDetail on User {
    _id
    firstName
    lastName
    root
    avatarUrl
    email
    mobile
    membercards
    address {
      line1
      city
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

export const GET_USERS_SHORT_INFO_QUERY = gql`
  query($data: GridRequest) {
    getAllUsersGrid(data: $data) {
      total
      data {
        _id
        firstName
        lastName
        root
        avatarUrl
        email
        mobile
        address {
          line1
          city
        }
        rolesInOrganizations {
          organizationId {
            _id
            name
          }
          role
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
