import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  token: null
};

function _update(state, payload) {
  return { ...state, ...payload };
}

const reducer = createReducer(
  {
    [actions.update]: _update
  },
  DEFAULT_STATE
);

export default reducer;
