import gql from 'graphql-tag';
import { semiPerson } from '../fragments/person';

export const profileUpdate = gql`
  mutation($profile: Profile!) {
    updateProdile(profile: $profile)
  }
`;

export const updateMe = gql`
  mutation updateMe($person: UpdatePerson!) {
    updateMe(person: $person) {
      ...personSemiFields
    }
  }

  ${semiPerson}
`;
