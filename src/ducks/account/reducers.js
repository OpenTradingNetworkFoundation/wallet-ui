import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = null;

function _update(state, account) {
  return account ? { ...state, ...account } : null;
}

const reducer = createReducer(
  {
    [actions.update]: _update
  },
  DEFAULT_STATE
);

export default reducer;
