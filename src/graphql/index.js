import { getBuildingsQuery, getBuildingQuery } from './queries/building';
import { getPeopleQuery, getPersonQuery } from './queries/person';
import { getProductsQuery, getProductQuery } from './queries/product';
import { searchQuery } from './queries/search';
import { serverHits, notification } from './subscriptions/subs';
import { leaveNotification } from './subscriptions/leave';

export {
  getBuildingQuery,
  getBuildingsQuery,
  getPeopleQuery,
  getPersonQuery,
  getProductsQuery,
  getProductQuery,
  searchQuery,
  serverHits,
  notification
};
