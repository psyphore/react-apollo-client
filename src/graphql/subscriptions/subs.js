import gql from 'graphql-tag';

export const notifications = gql`
  subscription {
    notifications {
      id
      subject
      body
    }
  }
`;

export const serverHits = gql`
  subscription {
    serverHits {
      id
      subject
      body
    }
  }
`;
