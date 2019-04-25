import { createAction } from 'redux-act';

const DETOKENIZE_FUNDS = 'app/detokenize-funds/DETOKENIZE_FUNDS';
const DETOKENIZE_FUNDS_FAIL = 'app/detokenize-funds/DETOKENIZE_FUNDS_FAIL';

const detokenizeFunds = createAction(DETOKENIZE_FUNDS);
const detokenizeFundsFail = createAction(DETOKENIZE_FUNDS_FAIL);

export default {
  detokenizeFunds,
  detokenizeFundsFail
};
