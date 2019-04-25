import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  valid: false
};

function validation(state, result) {
  return { ...state, ...result };
}

const reducer = createReducer(
  {
    [actions.validation]: validation
  },
  DEFAULT_STATE
);

export default reducer;
