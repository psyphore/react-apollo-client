import gql from 'graphql-tag';

export const basicLeaveNotification = gql`
  fragment leaveNotificationFields on LeaveNotification {
    id
    message
    status
  }
`;

export const basicLunchNotification = gql`
  fragment lunchNotificationFields on MealNotification {
    id
    message
    status
  }
`;

export const basicNotification = gql`
  fragment notificationFields on Note {
    id
    subject
    body
  }
`;
