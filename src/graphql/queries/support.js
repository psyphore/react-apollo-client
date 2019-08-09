import gql from 'graphql-tag';
import { fullSupport, basicSupport } from '../fragments/support';

export const currentSupportPerson = gql`
  query getSupprt {
    watcher {
      ...supportFullFields
    }
  }
  ${fullSupport}
`;

export const supportRegister = gql`
  query getAllSupporters($first: Int, $offset: Int) {
    watchers(first: $first, offset: $offset) {
      ...supportBasicFields
    }
  }
  ${basicSupport}
`;
