import gql from 'graphql-tag';
import { semiPerson } from '../fragments/person';

export const searchQuery = gql`
  query($query: BasicSearch!) {
    search(query: $query) {
      count
      data {
        ...personSemiFields
      }
    }
  }
  ${semiPerson}
`;
