import gql from 'graphql-tag';

export const searchQuery = gql`
  query($query: BasicSearch!) {
    search(query: $query) {
      count
      data {
        ...data
      }
    }
  }

  fragment data on Searchable {
    id
    displayName
    avatar
  }
`;
