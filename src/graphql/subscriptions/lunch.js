import gql from 'graphql-tag';

export const lunchNotification = gql`
  subscription {
    meals {
    id
    message
    status
  }
  }
`;

export const lunchPlacementNotification = gql`
  subscription {
    meals {
    id
    message
    status
  }
  }
`;
