import gql from 'graphql-tag';
import { basicBuilding } from '../fragments/building';
import { basicProduct } from '../fragments/product';

export const basicPerson = gql`
  fragment personBasicFields on Person {
    id
    firstname
    lastname
    knownAs
    deactivated
  }
`;

export const semiPerson = gql`
  fragment personSemiFields on Person {
    ...personBasicFields
    title
    avatar
  }
  ${basicPerson}
`;

export const fullPerson = gql`
  fragment personFullFields on Person {
    ...personSemiFields
    email
    mobile
    bio
    manager {
      ...personSemiFields
    }
    team {
      ...personSemiFields
    }
    line {
      ...personSemiFields
    }
    building {
      ...buildingBasicFields
    }
    products {
      ...productBasicFields
    }
  }
  ${basicProduct}
  ${basicBuilding}
  ${semiPerson}
`;

export const expandedPerson = gql`
  fragment personExpandedFields on Person {
    ...personFullFields
  }
  ${fullPerson}
`;
