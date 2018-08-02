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
`;

const getMeQuery = gql`
  query {
    me {
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
    meals {
      ...mealFields
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

  fragment mealFields on MealHistory {
    id
    content
    date
  }
`;

const getMyAvatarQuery = gql`
  query {
    me {
      id
      firstname
      lastname
      avatar
    }
  }
`;

export { getPeopleQuery, getPersonQuery, getMeQuery, getMyAvatarQuery };
