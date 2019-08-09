import gql from 'graphql-tag';

export const mealOfTheDay = gql`
  fragment todaysMeals on Meal {
    type
    name
    provider
  }
`;

export const mealHistory = gql`
  fragment mealHistoryFields on MealHistory {
    id
    content
    date
    by
  }
`;

export const mealHistoryBasic = gql`
  fragment mealBasicFields on MealHistory {
    content
  }
`;

export const mealRecommendationBasic = gql`
  fragment mealRecommandationFields on MealRecommendation {
    name
    score
  }
`;
