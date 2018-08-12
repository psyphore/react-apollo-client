import gql from 'graphql-tag';

export const getProductsQuery = gql`
  query($first: Int, $offset: Int) {
    products(first: $first, offset: $offset) {
      ...productBasicFields
    }
  }
`;

export const getProductQuery = gql`
  query($id: ID, $name: String) {
    products(id: $id, name: $name) {
      ...productFullFields
    }
  }
`;
