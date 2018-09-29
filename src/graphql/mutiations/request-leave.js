import gql from 'graphql-tag';

export const requestForLeave = gql`
  mutation($body: LeaveRequest!) {
    applyForLeave(request: $body)
  }
`;
