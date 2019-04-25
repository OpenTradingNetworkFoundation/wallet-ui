import { createAction } from 'redux-act';

const LOAD_HISTORY_REQUEST = 'app/history/internal/LOAD_HISTORY_REQUEST';
const LOAD_HISTORY_SUCCESS = 'app/history/internal/LOAD_HISTORY_SUCCESS';
const UPDATE_HISTORY_REQUEST = 'app/history/internal/UPDATE_HISTORY_REQUEST';
const UPDATE_HISTORY_SUCCESS = 'app/history/internal/UPDATE_HISTORY_SUCCESS';

const loadHistory = createAction(LOAD_HISTORY_REQUEST);
const loadHistorySuccess = createAction(LOAD_HISTORY_SUCCESS);

const updateHistory = createAction(UPDATE_HISTORY_REQUEST);
const updateHistorySuccess = createAction(UPDATE_HISTORY_SUCCESS);

export default {
  loadHistory,
  updateHistory,
  updateHistorySuccess,
  loadHistorySuccess
};
