import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_STATE = {
  connected: false,
  url: ''
};

function connect(state, url) {
  return { ...state, url, connected: true };
}

function disconnect(state) {
  return { ...state, connected: false };
}

function registerCurrentNode(state, url) {
  return { ...state, url };
}

export default createReducer(
  {
    [actions.connect]: connect,
    [actions.disconnect]: disconnect,
    [actions.registerCurrentNode]: registerCurrentNode
  },
  DEFAULT_STATE
);
