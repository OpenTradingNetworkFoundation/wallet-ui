import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  isFetching: false,
  assets: []
};

function _loadBalance(state) {
  return { ...state, isFetching: true };
}

function _loadBalanceSuccess(state, balances) {
  return { ...state, isFetching: false, assets: balances };
}

const reducer = createReducer(
  {
    [actions.loadBalance]: _loadBalance,
    [actions.loadBalanceSuccess]: _loadBalanceSuccess
  },
  DEFAULT_STATE
);

export default reducer;
