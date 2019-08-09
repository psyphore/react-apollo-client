import gql from 'graphql-tag';
import { semiPerson } from './person';

export const fullSupport = gql`
  fragment supportFullFields on Support {
    wk
    from
    to
    person {
      ...personSemiFields
    }
  }
  ${semiPerson}
`;

export const basicSupport = gql`
  fragment supportBasicFields on Support {
    wk
    from
    to
    person {
      ...personSemiFields
    }
  }
  ${semiPerson}
`;
