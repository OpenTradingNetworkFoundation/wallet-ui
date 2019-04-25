import { createAction } from 'redux-act';

const CHANGE_LANGUAGE = 'app/translation/CHANGE_LANGUAGE';

const changeLanguage = createAction(CHANGE_LANGUAGE);

export default {
  changeLanguage
};
