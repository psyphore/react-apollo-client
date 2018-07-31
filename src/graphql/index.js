import { getBuildingsQuery, getBuildingQuery } from './queries/building';
import {
  getPeopleQuery,
  getPersonQuery,
  getMeQuery,
  getMyAvatarQuery
} from './queries/person';
import { getProductsQuery, getProductQuery } from './queries/product';
import { searchQuery } from './queries/search';
import { serverHits, notifications } from './subscriptions/subs';
import { leaveNotification } from './subscriptions/leave';
import { todaysMeals } from './queries/lunch';
import { placeOrder } from './mutiations/order-lunch';
import { supportRegister, currentSupportPerson } from './queries/support';

export {
  getBuildingQuery,
  getBuildingsQuery,
  getPeopleQuery,
  getPersonQuery,
  getProductsQuery,
  getProductQuery,
  searchQuery,
  serverHits,
  notifications,
  leaveNotification,
  todaysMeals,
  placeOrder,
  supportRegister,
  currentSupportPerson,
  getMeQuery,
  getMyAvatarQuery
};
