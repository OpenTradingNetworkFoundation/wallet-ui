import { createAction } from 'redux-act';

const RESET_STORE = 'app/root/RESET_STORE';

const resetStore = createAction(RESET_STORE);

export default {
  resetStore
};
