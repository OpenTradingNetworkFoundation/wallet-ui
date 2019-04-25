import { createAction } from 'redux-act';

const BALANCE_REQUEST = 'app/balance/BALANCE_REQUEST';
const BALANCE_REQUEST_SUCCESS = 'app/balance/BALANCE_REQUEST_SUCCESS';
const BALANCE_REQUEST_FAIL = 'app/balance/BALANCE_REQUEST_FAIL';

const loadBalance = createAction(BALANCE_REQUEST);
const loadBalanceSuccess = createAction(BALANCE_REQUEST_SUCCESS);
const loadBalanceFail = createAction(BALANCE_REQUEST_FAIL);

export default {
  loadBalance,
  loadBalanceSuccess,
  loadBalanceFail
};
