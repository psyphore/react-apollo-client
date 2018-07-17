import gql from 'graphql-tag';

const lunchNotification = gql`
  subscription {
    lunchNotification {
      id
      subject
      body
    }
  }
`;

export { lunchNotification };
