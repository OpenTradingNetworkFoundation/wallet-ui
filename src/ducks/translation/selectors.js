import { createSelector } from 'reselect';

const getData = state => state.translation;

const getCurrentLanguage = createSelector(getData, data => data.language);

export default { getData, getCurrentLanguage };
