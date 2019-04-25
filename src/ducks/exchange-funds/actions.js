import { createAction } from 'redux-act';

const EXCHANGE_FUNDS = 'app/exchange-funds/EXCHANGE';
const EXCHANGE_FUNDS_FAIL = 'app/exchange-funds/EXCHANGE_FUNDS_FAIL';

const exchangeFunds = createAction(EXCHANGE_FUNDS);
const exchangeFundsFail = createAction(EXCHANGE_FUNDS_FAIL);

export default {
  exchangeFunds,
  exchangeFundsFail
};
