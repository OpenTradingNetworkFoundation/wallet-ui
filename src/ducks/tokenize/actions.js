import { createAction } from 'redux-act';

const REQUEST_ADDRESS = 'app/tokenize/REQUEST_ADDRESS';
const REQUEST_ADDRESS_SUCCESS = 'app/tokenize/REQUEST_ADDRESS_SUCCESS';
const REQUEST_ADDRESS_FAILURE = 'app/tokenize/REQUEST_ADDRESS_FAILURE';

const requestAddress = createAction(REQUEST_ADDRESS);
const requestAddressSuccess = createAction(REQUEST_ADDRESS_SUCCESS);
const requestAddressFailure = createAction(REQUEST_ADDRESS_FAILURE);

export default {
  requestAddress,
  requestAddressSuccess,
  requestAddressFailure
};
