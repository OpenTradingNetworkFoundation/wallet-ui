import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  isLoading: false,
  feeAmount: null
};

function _loadFee(state) {
  return { ...state, isLoading: true };
}

function _loadFeeSuccess(state, feeAmount) {
  return { ...state, isLoading: false, feeAmount };
}

const reducer = createReducer(
  {
    [actions.loadFee]: _loadFee,
    [actions.loadFeeSuccess]: _loadFeeSuccess
  },
  DEFAULT_STATE
);

export default reducer;
