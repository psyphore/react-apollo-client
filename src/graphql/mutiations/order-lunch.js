import gql from 'graphql-tag';

export const placeOrder = gql`
  mutation($body: MealOrder!) {
    placeOrder(order: $body)
  }
`;
