import gql from 'graphql-tag';
import { basicNotification } from '../fragments/subscription';

export const notifications = gql`
  subscription getNotifications {
    notifications {
      ...notificationFields
    }
  }
  ${basicNotification}
`;

export const serverHits = gql`
  subscription getServerHits {
    serverHits {
      ...notificationFields
    }
  }
  ${basicNotification}
`;

export const getMyNotifications = gql`
  subscription getMyNotifications($id: ID) {
    myNotifications(id: $id) {
      ...notificationFields
    }
  }
  ${basicNotification}
`;
