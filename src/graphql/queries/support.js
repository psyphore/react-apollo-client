import gql from 'graphql-tag';

export const currentSupportPerson = gql`
  query {
    watcher {
      ...watch
    }
  }

  fragment watch on Support {
    wk
    from
    to
    person {
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

export const supportRegister = gql`
  query($first: Int, $offset: Int) {
    watchers(first: $first, offset: $offset) {
      ...watch
    }
  }

  fragment watch on Support {
    wk
    from
    to
    person
  }
`;
