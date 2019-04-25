import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = { limitOrders: [] };

function limitOrdersSuccess(state, { baseId, quoteId, limitOrders }) {
  return { ...state, baseId, quoteId, limitOrders };
}

const reducer = createReducer(
  {
    [actions.limitOrdersSuccess]: limitOrdersSuccess
  },
  DEFAULT_STATE
);

export default reducer;
