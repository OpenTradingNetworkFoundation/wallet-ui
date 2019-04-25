import { createAction } from 'redux-act';

const GET_PRICE = 'app/rates/GET_PRICE';
const UPDATE_PRICE = 'app/rates/UPDATE_PRICE';
const UPDATE_AVAILABLE_AMOUNT = 'app/rates/UPDATE_AVAILABLE_AMOUNT';

const getPrice = createAction(GET_PRICE);
const updatePrice = createAction(UPDATE_PRICE);
const updateAvailableAmount = createAction(UPDATE_AVAILABLE_AMOUNT);

export default {
  getPrice,
  updatePrice,
  updateAvailableAmount
};
