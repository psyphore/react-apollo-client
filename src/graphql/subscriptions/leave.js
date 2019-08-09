import gql from 'graphql-tag';
import { basicLeaveNotification } from '../fragments/subscription';

export const leaveNotification = gql`
  subscription leave {
    myLeaveNotifications {
      ...leaveNotificationFields
    }
  }
  ${basicLeaveNotification}
`;
