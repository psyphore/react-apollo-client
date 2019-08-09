import gql from 'graphql-tag';
import { basicLunchNotification } from '../fragments/subscription';

export const lunchNotification = gql`
  subscription getMealNotifications {
    meals {
      ...lunchNotificationFields
    }
  }
  ${basicLunchNotification}
`;

export const lunchPlacementNotification = gql`
  subscription getMyLunchPlacementNotifications {
    meals {
      ...lunchNotificationFields
    }
  }
  ${basicLunchNotification}
`;
