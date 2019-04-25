import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  address: { isFetching: false, error: null, data: null }
};

function _requestAddress(state) {
  return {
    ...state,
    address: { ...state.address, isFetching: true, error: null }
  };
}

function _requestAddressSuccess(state, data) {
  return {
    ...state,
    address: { data, isFetching: false, error: null }
  };
}

function _requestAddressFailure(state, error) {
  return {
    ...state,
    address: { ...state.address, isFetching: false, error }
  };
}

const reducer = createReducer(
  {
    [actions.requestAddress]: _requestAddress,
    [actions.requestAddressSuccess]: _requestAddressSuccess,
    [actions.requestAddressFailure]: _requestAddressFailure
  },
  DEFAULT_STATE
);

export default reducer;
