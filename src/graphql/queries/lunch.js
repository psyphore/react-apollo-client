import gql from 'graphql-tag';
import {
  mealOfTheDay,
  mealRecommendationBasic,
  mealHistory
} from '../fragments/lunch';

export const fetchMealProperties = gql`
  query getMealProps($type: MealProperties!) {
    mealProps(type: $type)
  }
`;

export const todaysMeals = gql`
  query getMealSpecials($date: String) {
    meals(date: $date) {
      ...todaysMeals
    }
  }
  ${mealOfTheDay}
`;

export const myMealHistory = gql`
  query getMealHistory($first: Int, $offset: Int) {
    lunchHistory(first: $first, offset: $offset) {
      ...mealHistoryFields
    }
  }
  ${mealHistory}
`;

export const mealTrends = gql`
  query getMealTrends($date: String!, $first: Int = 5, $offset: Int = 0) {
    trendingMeals(date: $date, first: $first, offset: $offset) {
      ...mealRecommandationFields
    }
  }
  ${mealRecommendationBasic}
`;

export const recomendedMeals = gql`
  query getMealTrends($date: String!, $first: Int = 5, $offset: Int = 0) {
    recommendations(date: $date, first: $first, offset: $offset) {
      ...mealRecommandationFields
    }
  }
  ${mealRecommendationBasic}
`;
