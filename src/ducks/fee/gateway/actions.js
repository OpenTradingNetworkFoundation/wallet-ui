import { createAction } from 'redux-act';

const FEES_LOAD = 'app/fee/gateway/FEES_LOAD';
const FEES_LOAD_SUCCESS = 'app/fee/gateway/FEES_LOAD_SUCCESS';

const loadFees = createAction(FEES_LOAD);
const loadSuccess = createAction(FEES_LOAD_SUCCESS);

export default {
  loadFees,
  loadSuccess
};
