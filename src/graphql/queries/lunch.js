import gql from 'graphql-tag';

export const todaysMeals = gql`
  query($date: String) {
    meals(date: $date) {
      type
      name
    }
  }
`;

export const myMealHistory = gql`
  query($first: Int, $offset: Int) {
    lunchHistory(first: $first, offset: $offset) {
      id
      content
      date
    }
  }
`;

export const mealTrends = gql`
  query($first: Int, $offset: Int) {
    meals(fist: $first, offset: $offset) {
      hits
      name
    }
  }
`;

export const recomendedMeals = gql`
  query($first: Int, $offset: Int) {
    meals(fist: $first, offset: $offset) {
      name
    }
  }
`;
