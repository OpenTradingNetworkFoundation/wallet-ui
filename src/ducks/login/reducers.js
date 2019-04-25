import { createReducer } from 'redux-act';

import localizer from 'utils/localizer';

import actions from './actions';

const DEFAULT_STATE = {
  isFetching: false,
  error: null
};

const DEFAULT_ERROR = {
  message: localizer.getValue('errors.unknown_error.message')
};

function _loginFailed(state, error = DEFAULT_ERROR) {
  return { ...state, error, isFetching: false };
}

function _loginRequest(state) {
  return { ...state, error: null, isFetching: true };
}

function _loginSuccessed(state) {
  return { ...state, error: null, isFetching: false };
}

const reducer = createReducer(
  {
    [actions.loginRequestFailure]: _loginFailed,
    [actions.loginRequest]: _loginRequest,
    [actions.loginRequestSuccess]: _loginSuccessed
  },
  DEFAULT_STATE
);

export default reducer;
