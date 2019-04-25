import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  lastIrreversibleBlock: null
};

const loadMetaSuccess = (state, meta) => {
  return {
    ...state,
    lastIrreversibleBlock: meta.last_irreversible_block_num
  };
};

const reducer = createReducer(
  {
    [actions.loadMetaSuccess]: loadMetaSuccess
  },
  DEFAULT_STATE
);

export default reducer;
