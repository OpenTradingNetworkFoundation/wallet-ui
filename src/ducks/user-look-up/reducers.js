import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  isLoading: false,
  account: null
};

const lookUp = () => ({ isLoading: true, account: null });

const update = (state, newState = {}) => ({ ...state, ...newState });

const reducer = createReducer(
  {
    [actions.lookUp]: lookUp,
    [actions.update]: update,
    [actions.lookUpSuccess]: update
  },
  DEFAULT_STATE
);

export default reducer;
