import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  price: null,
  availableAmount: null,
  isAvailable: false,
  isLoading: false
};

function updatePrice(state, data) {
  return { ...state, ...data };
}

function getPrice(state) {
  return { ...state, isLoading: true };
}

function updateAvailableAmount(state, availableAmount) {
  return { ...state, ...availableAmount };
}

const reducer = createReducer(
  {
    [actions.updatePrice]: updatePrice,
    [actions.getPrice]: getPrice,
    [actions.updateAvailableAmount]: updateAvailableAmount
  },
  DEFAULT_STATE
);

export default reducer;
