import gql from 'graphql-tag';
import { fullSupport, basicSupport } from '../fragments/support';

export const currentSupportPerson = gql`
  query {
    watcher {
      ...supportFullFields
    }
  }
  ${fullSupport}
`;

export const supportRegister = gql`
  query($first: Int, $offset: Int) {
    watchers(first: $first, offset: $offset) {
      ...supportBasicFields
    }
  }
  ${basicSupport}
`;
