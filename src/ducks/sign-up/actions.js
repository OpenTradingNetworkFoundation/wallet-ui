import { createAction } from 'redux-act';

const SIGN_UP_REQUEST = 'app/sign-up/SIGN_UP_REQUEST';
const SIGN_UP_UPDATE = 'app/sign-up/SIGN_UP_UPDATE';

const signUpRequest = createAction(SIGN_UP_REQUEST);
const signUpUpdate = createAction(SIGN_UP_UPDATE);

export default {
  signUpRequest,
  signUpUpdate
};
