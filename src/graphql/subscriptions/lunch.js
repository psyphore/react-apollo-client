import gql from 'graphql-tag';

export const lunchNotification = gql`
  subscription {
    meals {
      id
      subject
      body
    }
  }
`;
