import gql from 'graphql-tag';

export const requestForLeave = gql`
  mutation applyForLeave($body: LeaveRequest!) {
    applyForLeave(leave: $body) {
      id
    }
  }
`;
