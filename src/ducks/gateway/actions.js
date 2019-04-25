import { createAction } from 'redux-act';

const GET_INFO = 'app/gateway/GET_INFO';
const GET_INFO_SUCCESS = 'app/gateway/GET_INFO_SUCCESS';

const getInfo = createAction(GET_INFO);
const getInfoSuccess = createAction(GET_INFO_SUCCESS);

export default {
  getInfo,
  getInfoSuccess
};
