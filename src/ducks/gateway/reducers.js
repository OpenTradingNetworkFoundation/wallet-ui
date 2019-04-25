import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  gatewayId: null,
  availableAssets: []
};

function getInfoSuccess(state, payload) {
  const { gatewayId, availableAssets = [] } = payload;

  return { ...state, gatewayId, availableAssets };
}

const reducer = createReducer(
  {
    [actions.getInfoSuccess]: getInfoSuccess
  },
  DEFAULT_STATE
);

export default reducer;
