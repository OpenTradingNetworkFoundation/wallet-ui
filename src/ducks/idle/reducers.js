import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  last_activity: Date.now()
};

function updateActivity(state) {
  return { ...state, last_activity: Date.now() };
}

const reducer = createReducer(
  {
    [actions.updateActivity]: updateActivity
  },
  DEFAULT_STATE
);

export default reducer;
