import gql from 'graphql-tag';
import { semiPerson } from './person';

export const basicProduct = gql`
  fragment productBasicFields on Product {
    id
    name
    description
    status
  }
`;

export const semiProduct = gql`
  fragment productSemiFields on Product {
    ...productBasicFields
    art
    championCount
  }
  ${basicProduct}
`;

export const fullProduct = gql`
  fragment productFullFields on Product {
    ...productSemiFields
    champions {
      ...personSemiFields
    }
  }
  ${semiProduct}
  # ${semiPerson}
`;
