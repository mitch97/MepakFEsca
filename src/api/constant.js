export const BASE_URL = 'http://192.168.1.67:3333';
export const API_PATH = '/api/v1';
export const CONFIG_PATH = '/config';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const CATEGORIES_PATH = '/categories';
export const TABLES_PATH = '/tables';
export const AGGREGATE_ORDERS_PATH = '/aggregates/orders';
export const AGGREGATE_ORDER_PATH = (order = undefined) =>
  `/aggregates/order${order ? `/${order}` : ''}`;
export const PRODUCTS_BY_CATEGORY_PATH = category =>
  `/product?category=${category}`;
export const ORDER_PATH = (order = undefined) =>
  `/order${order ? `/${order}` : ''}`;
export const ORDER_STATUS_PATH = (order = undefined) =>
  `/order/status${order ? `/${order}` : ''}`;
export const ORDERS_PATH = (query = undefined) => {
  if (query) {
    return `/orders?${Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&')}`;
  }
  return '/orders';
};
