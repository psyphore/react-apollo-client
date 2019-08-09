import gql from 'graphql-tag';
import { basicProduct, semiProduct } from '../fragments/product';

export const getProductsQuery = gql`
  query getProducts($first: Int, $offset: Int) {
    products(first: $first, offset: $offset) {
      ...productBasicFields
    }
  }
  ${basicProduct}
`;

export const getProductQuery = gql`
  query getProduct($name: String) {
    product(title: $name) {
      ...productSemiFields
      champions {
        id
        firstname
        lastname
        avatar
      }
    }
  }
  ${semiProduct}
`;
