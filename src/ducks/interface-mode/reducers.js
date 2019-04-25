import { createReducer } from 'redux-act';

import EXCHANGE_MODE from 'enums/exchangeMode';

import actions from './actions';

const DEFAULT_STATE = {
  mode: EXCHANGE_MODE.LIGHT
};

function updateInterfaceMode(state, mode) {
  return { ...state, mode };
}

const reducer = createReducer(
  {
    [actions.updateInterfaceMode]: updateInterfaceMode
  },
  DEFAULT_STATE
);

export default reducer;
