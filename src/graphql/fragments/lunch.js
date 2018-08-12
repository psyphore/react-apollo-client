import gql from 'graphql-tag';

export const mealOfTheDay = gql`
  fragment todaysMeals on Meal {
    type
    name
  }
`;

export const mealHistory = gql`
  fragment mealHistoryFields on MealHistory {
    id
    content
    date
  }
`;

export const mealHistoryBasic = gql`
  fragment mealBasicFields on MealHistory {
    content
  }
`;
