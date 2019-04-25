import { createAction } from 'redux-act';

const SEND_FUNDS = 'app/send-funds/SEND_FUNDS';

const sendFunds = createAction(SEND_FUNDS);
export default {
  sendFunds
};
