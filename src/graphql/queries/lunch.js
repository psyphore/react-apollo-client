import gql from 'graphql-tag';
import {
  mealOfTheDay,
  mealHistoryBasic,
  mealHistory
} from '../fragments/lunch';

export const todaysMeals = gql`
  query($date: String) {
    meals(date: $date) {
      ...todaysMeals
    }
  }
  ${mealOfTheDay}
`;

export const myMealHistory = gql`
  query($first: Int, $offset: Int) {
    lunchHistory(first: $first, offset: $offset) {
      ...mealHistoryFields
    }
  }
  ${mealHistory}
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
      ...mealBasicFields
    }
  }
  ${mealHistoryBasic}
`;
