import { createAction } from 'redux-act';

const FEE_LOAD = 'app/fee/detokenize/FEE_LOAD';
const FEE_LOAD_SUCCESS = 'app/fee/detokenize/FEE_LOAD_SUCCESS';

const loadFee = createAction(FEE_LOAD);
const loadFeeSuccess = createAction(FEE_LOAD_SUCCESS);

export default {
  loadFee,
  loadFeeSuccess
};
