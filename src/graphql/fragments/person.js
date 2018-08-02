import gql from 'graphql-tag';
// import { basic as bb } from '../fragments/building';

export const basic = gql`
  fragment personBasicFields on Person {
    id
    firstname
    lastname
  }
`;

export const semi = gql`
  fragment personSemiFields on Person {
    id
    title
    firstname
    lastname
    avatar
  }
`;

export const full = gql`
  fragment personFullFields on Person {
    id
    title
    firstname
    lastname
    email
    mobile
    bio
    avatar
    manager {
      ...personSemiFields
    }
    team {
      ...personSemiFields
    }
    line {
      ...personSemiFields
    }
  }

  ${semi}
`;

export const exp = gql`
  fragment personFields on Person {
    id
    title
    firstname
    lastname
    email
    mobile
    bio
    avatar
    manager {
      ...personSemiFields
    }
    team {
      ...personSemiFields
    }
    line {
      ...personSemiFields
    }
    meals {
      ...mealFields
    }
  }

  fragment productField on Product {
    id
    name
    description
    status
    art
    championCount
    champions {
      ...otherPeopleFields
    }
  }

  fragment buildingField on Building {
    name
    address
  }

  fragment mealFields on Meal {
    name
  }

  ${semi}
`;
