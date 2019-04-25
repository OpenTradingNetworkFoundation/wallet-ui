import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  initialLoad: true,
  operations: []
};

function loadHistorySuccess(state, { operations }) {
  return {
    ...state,
    initialLoad: false,
    operations: [...operations]
  };
}

const reducer = createReducer(
  {
    [actions.loadHistorySuccess]: loadHistorySuccess
  },
  DEFAULT_STATE
);

export default reducer;
