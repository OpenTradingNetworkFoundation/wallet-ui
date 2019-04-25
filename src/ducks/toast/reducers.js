import { createReducer } from 'redux-act';
import omit from 'lodash/omit';

import { STATES } from 'enums/toast';

import actions from './actions';

const DEFAULT_STATE = {
  ids: [],
  items: {},

  isFocused: false
};

/*
* { title: '',  }
* */
function itemCreate(state, data) {
  return {
    ...state,
    ids: [...state.ids, data.id],
    items: { ...state.items, [data.id]: data }
  };
}

const updateItemState = status => (state, { id }) => {
  const item = state.items[id];

  return {
    ...state,
    items: { ...state.items, [item.id]: { ...item, state: status } }
  };
};

function itemRemove(state, { id }) {
  const idx = state.ids.findIndex(it => it === id);
  return {
    ...state,
    ids: [...state.ids.slice(0, idx), ...state.ids.slice(idx + 1)],
    items: omit(state.items, id)
  };
}

function focus(state) {
  return {
    ...state,
    isFocused: true
  };
}

function blur(state) {
  return {
    ...state,
    isFocused: false
  };
}

const reducer = createReducer(
  {
    [actions.itemCreate]: itemCreate,
    [actions.itemShow]: updateItemState(STATES.SHOW),
    [actions.itemHide]: updateItemState(STATES.HIDE),
    [actions.itemClose]: updateItemState(STATES.CLOSE),
    [actions.itemCollapse]: updateItemState(STATES.COLLAPSE),
    [actions.itemRemove]: itemRemove,

    [actions.focus]: focus,
    [actions.blur]: blur
  },
  DEFAULT_STATE
);

export default reducer;
