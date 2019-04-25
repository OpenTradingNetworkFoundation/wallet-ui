import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {};

const loadSuccess = (state, accounts) => {
  const mapped = accounts.reduce((res, acc) => ({ ...res, [acc.id]: acc }), {});
  return { ...state, ...mapped };
};

const reducer = createReducer(
  {
    [actions.loadProfilesSuccess]: loadSuccess
  },
  DEFAULT_STATE
);

export default reducer;
