import { createReducer } from 'redux-act';

import actions from './actions';

const DEFAULT_LANGUAGE = 'en';

const DEFAULT_STATE = {
  language: DEFAULT_LANGUAGE
};

function _changeLanguage(state, language = DEFAULT_LANGUAGE) {
  return { ...state, language };
}

const reducer = createReducer(
  {
    [actions.changeLanguage]: _changeLanguage
  },
  DEFAULT_STATE
);

export default reducer;
