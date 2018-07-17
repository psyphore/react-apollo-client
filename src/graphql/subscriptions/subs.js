import gql from 'graphql-tag';

const notification = gql`
  subscription {
    notifications {
      id
      subject
      body
    }
  }
`;

const serverHits = gql`
  subscription {
    serverHits {
      id
      subject
      body
    }
  }
`;

export { notification, serverHits };
