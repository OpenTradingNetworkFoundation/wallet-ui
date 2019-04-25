import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = { initialLoad: true, operations: [] };

function loadHistorySuccess(state, history) {
  return { ...state, initialLoad: false, operations: [...history] };
}
function updateHistorySuccess(state, historyEntries) {
  return { ...state, operations: historyEntries.concat(state.operations) };
}

const reducer = createReducer(
  {
    [actions.loadHistorySuccess]: loadHistorySuccess,
    [actions.updateHistorySuccess]: updateHistorySuccess
  },
  DEFAULT_STATE
);

export default reducer;
