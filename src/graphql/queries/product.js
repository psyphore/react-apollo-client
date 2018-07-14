import gql from 'graphql-tag';

const getProductsQuery = gql`
  query($first: Int, $offset: Int) {
    products(first: $first, offset: $offset) {
      ...basicProductFields
    }
  }

  fragment basicProductFields on Product {
    id
    name
    description
    status
  }
`;

const getProductQuery = gql`
  query($id: ID, $name: String) {
    products(id: $id, name: $name) {
      ...basicProductFields
    }
  }

  fragment basicProductFields on Product {
    id
    name
    description
    status
    champions {
      ...basicPersonField
    }
  }

  fragment basicPersonField on Person {
    id
    firstname
    lastname
  }
`;

export { getProductsQuery, getProductQuery };
