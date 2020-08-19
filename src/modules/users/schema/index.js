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
`;

export const GET_USERS_SHORT_INFO_QUERY = gql`
  query($data: GridRequest){
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

export default {};
