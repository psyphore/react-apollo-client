import gql from 'graphql-tag';

const leaveNotification = gql`
  subscription {
    leaveNotification {
      id
      subject
      body
    }
  }
`;

export { leaveNotification };
