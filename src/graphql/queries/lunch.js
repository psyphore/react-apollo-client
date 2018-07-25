import gql from 'graphql-tag';

export const todaysMeals = gql`
  query($date: String) {
    meals(date: $date) {
      type
      name
    }
  }
`;
