import gql from 'graphql-tag';
import { semiPerson, fullPerson, expandedPerson } from '../fragments/person';

export const getPeopleQuery = gql`
  query getPeople($first: Int, $offset: Int) {
    people(first: $first, offset: $offset) {
      ...personSemiFields
    }
  }
  ${semiPerson}
`;

export const getPersonQuery = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      ...personFullFields
    }
  }
  ${fullPerson}
`;

export const getMeQuery = gql`
  query getMe {
    me {
      ...personExpandedFields
    }
  }
  ${expandedPerson}
`;

export const getMyAvatarQuery = gql`
  query getMyAvatar {
    me {
      ...personSemiFields
    }
  }
  ${semiPerson}
`;

export const getMyNotificationsQuery = gql`
  query getNotification($id: ID) {
    myNotifications(id: $id) {
      id
      subject
      body
    }
  }
`;
