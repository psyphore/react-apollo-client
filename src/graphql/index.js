export { getBuildingsQuery, getBuildingQuery } from './queries/building';
export {
  getPeopleQuery,
  getPersonQuery,
  getMeQuery,
  getMyAvatarQuery,
  getMyNotificationsQuery
} from './queries/person';
export { updateMe } from './mutiations/profile-update';
export { getProductsQuery, getProductQuery } from './queries/product';
export { searchQuery } from './queries/search';
export {
  serverHits,
  notifications,
  getMyNotifications
} from './subscriptions/subs';
export { leaveNotification } from './subscriptions/leave';
export {
  todaysMeals,
  mealTrends,
  myMealHistory,
  recomendedMeals
} from './queries/lunch';
export {
  placeOrder,
  setMealOptions,
  placeMultipleOrders
} from './mutiations/order-lunch';
export { supportRegister, currentSupportPerson } from './queries/support';
export { upload_file, upload_files } from './mutiations/media-upload';
