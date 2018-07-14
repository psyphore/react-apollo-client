import gql from 'graphql-tag';

const getPeopleQuery = gql`
  query($first: Int, $offset: Int) {
    people(first: $first, offset: $offset) {
      ...personFields
    }
  }

  fragment personFields on Person {
    id
    title
    firstname
    lastname
    avatar
  }
`;

const getPersonQuery = gql`
  query($id: ID!) {
    person(id: $id) {
      ...personFields
      products {
        ...productField
      }
      building {
        ...buildingField
      }
    }
  }

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
      ...otherPeopleFields
    }
    team {
      ...otherPeopleFields
    }
    line {
      ...otherPeopleFields
    }
  }

  fragment otherPeopleFields on Person {
    id
    title
    firstname
    lastname
    avatar
  }

  fragment productField on Product {
    name
    status
  }

  fragment buildingField on Building {
    name
    address
  }
`;

export { getPeopleQuery, getPersonQuery };
