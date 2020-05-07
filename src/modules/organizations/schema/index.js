import gql from 'graphql-tag';

const organizationOnOrganization = gql`
  fragment organization on Organization {
    _id
    name
    slug
    imageUrl
    description
    address {
      type
      properties {
        name
        line1
        postalCode
        city
        state
        country
      }
    }
  }
`;

export const GET_ORGANIZATIONS_LIST_QUERY = gql`
  {
    getAllOrganizations {
      ...organization
    }
  }
  ${organizationOnOrganization}
`;

export const CREATE_ORGANIZATION_MUTATION = gql`
  mutation createOrganization($data: CreateOrganizationInput!) {
    createOrganization(data: $data) {
      ...organization
    }
  }
  ${organizationOnOrganization}
`;
