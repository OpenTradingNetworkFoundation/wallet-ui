import { createAction } from 'redux-act';

const LIMIT_ORDERS_REQUEST = 'app/order-book/LIMIT_ORDERS_REQUEST';
const LIMIT_ORDERS_SUCCESS = 'app/order-book/LIMIT_ORDERS_SUCCESS';

const limitOrdersRequest = createAction(LIMIT_ORDERS_REQUEST);
const limitOrdersSuccess = createAction(LIMIT_ORDERS_SUCCESS);

export default {
  limitOrdersRequest,
  limitOrdersSuccess
};
