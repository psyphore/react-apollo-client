import gql from 'graphql-tag';

export const searchQuery = gql`
  # Try to write your query here
query($query: BasicSearch!) {
  search(query: $query) {
    count
    data {
      ...data
    }
  }
}

fragment data on Person {
  id
  firstname
  lastname
  avatar
}

`;
