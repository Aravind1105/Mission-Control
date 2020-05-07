import gql from 'graphql-tag';

import { userDetailOnUser } from 'modules/users/schema';

export const GET_SELF_INFO_QUERY = gql`
  {
    getSelf {
      ...userDetail
    }
  }
  ${userDetailOnUser}
`;

export default {};
