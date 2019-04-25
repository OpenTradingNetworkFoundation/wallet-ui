import { createAction } from 'redux-act';

const VALIDATION = 'app/addressValidation/VALIDATE';
const REQUEST_VALIDATE = 'app/addressValidation/REQUEST_VALIDATE';

const validation = createAction(VALIDATION);
const requestValidate = createAction(REQUEST_VALIDATE);

export default {
  validation,
  requestValidate
};
