import { createAction } from 'redux-act';

const LOAD_HISTORY_REQUEST = 'app/history/external/LOAD_HISTORY_REQUEST';
const LOAD_HISTORY_SUCCESS = 'app/history/external/LOAD_HISTORY_SUCCESS';

const loadHistory = createAction(LOAD_HISTORY_REQUEST);
const loadHistorySuccess = createAction(LOAD_HISTORY_SUCCESS);

export default {
  loadHistory,
  loadHistorySuccess
};
