import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  isLoading: false,
  fee: {}
};

function _loadFees(state) {
  return { ...state, isLoading: true };
}

function _loadSuccess(state, fees) {
  const fee = fees.reduce((pr, fee) => ({ ...pr, [fee.id]: fee.fee }), {});

  return { ...state, isLoading: false, fee };
}

const reducer = createReducer(
  {
    [actions.loadFees]: _loadFees,
    [actions.loadSuccess]: _loadSuccess
  },
  DEFAULT_STATE
);

export default reducer;
