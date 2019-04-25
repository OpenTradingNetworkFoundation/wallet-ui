import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  isFetching: false,
  error: null,
  result: null
};

function signUpRequest(state) {
  return { ...state, error: null, isFetching: true };
}

function signUpUpdate(state, payload = {}) {
  return { ...state, ...payload };
}

const reducer = createReducer(
  {
    [actions.signUpRequest]: signUpRequest,
    [actions.signUpUpdate]: signUpUpdate
  },
  DEFAULT_STATE
);

export default reducer;
