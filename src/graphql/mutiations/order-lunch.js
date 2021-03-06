import gql from 'graphql-tag';

export const placeOrder = gql`
  mutation mealOrder($body: MealOrder!) {
    placeOrder(order: $body)
  }
`;

export const placeMultipleOrders = gql`
  mutation placeMealOrders($meals: [MealOrder]!) {
    placeMultipleOrder(order: $meals)
  }
`;

export const removeOrder = gql`
  mutation removeOrder($body: RemoveMealOrder!) {
    removeOrder(order: $body)
  }
`;

export const setMealOptions = gql`
  mutation saveMealOptions($body: [MealOption]!) {
    setMeals(meals: $body)
  }
`;
