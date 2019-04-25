import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = [];

function loadAssetsSuccess(state, assets) {
  return [...assets];
}

const reducer = createReducer(
  {
    [actions.loadAssetsSuccess]: loadAssetsSuccess
  },
  DEFAULT_STATE
);

export default reducer;
