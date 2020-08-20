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
  query($data: GridRequest){
    getOrganizationsGrid(data: $data) {
      total
      data {
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
    }
  }
`;

export const CREATE_ORGANIZATION_MUTATION = gql`
  mutation createOrganization($data: CreateOrganizationInput!) {
    createOrganization(data: $data) {
      ...organization
    }
  }
  ${organizationOnOrganization}
`;

export const GET_ORGANIZATION_BY_ID = gql`
  query($id: String!) {
    getOrganizationById(id: $id) {
      name
    }
  }
`;
