import gql from 'graphql-tag';
import { semiPerson } from '../fragments/person';

export const searchQuery = gql`
  query Search($query: BasicSearch!) {
    search(query: $query) {
      count
      data {
        ...personSemiFields
      }
    }
  }
  ${semiPerson}
`;
