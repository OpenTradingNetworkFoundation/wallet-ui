import { createAction } from 'redux-act';

const LOGIN_REQUEST = 'app/login/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'app/login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'app/login/LOGIN_FAILURE';
const LOGOUT = 'app/login/LOGOUT';

const loginRequest = createAction(LOGIN_REQUEST);
const loginRequestSuccess = createAction(LOGIN_SUCCESS);
const loginRequestFailure = createAction(LOGIN_FAILURE);
const logout = createAction(LOGOUT);

export default {
  loginRequest,
  loginRequestSuccess,
  loginRequestFailure,
  logout
};
