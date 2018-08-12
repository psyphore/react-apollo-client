import gql from 'graphql-tag';
import { semiPerson, fullPerson, expandedPerson } from '../fragments/person';

export const getPeopleQuery = gql`
  query($first: Int, $offset: Int) {
    people(first: $first, offset: $offset) {
      ...personSemiFields
    }
  }
  ${semiPerson}
`;

export const getPersonQuery = gql`
  query($id: ID!) {
    person(id: $id) {
      ...personFullFields
    }
  }
  ${fullPerson}
`;

export const getMeQuery = gql`
  query {
    me {
      ...personExpandedFields
    }
  }
  ${expandedPerson}
`;

export const getMyAvatarQuery = gql`
  query {
    me {
      ...personSemiFields
    }
  }
  ${semiPerson}
`;

export const getMyNotificationsQuery = gql`
  query($id: ID) {
    myNotifications(id: $id) {
      id
      subject
      body
    }
  }
`;
