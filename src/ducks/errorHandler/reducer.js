import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  unhandledExceptions: []
};

function genericError(state, error) {
  return {
    ...state,
    unhandledExceptions: [...state.unhandledExceptions, error]
  };
}

const reducer = createReducer(
  {
    [actions.genericError]: genericError
  },
  DEFAULT_STATE
);

export default reducer;
