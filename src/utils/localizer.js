import { get } from 'lodash';

import makeHTTPRequest from 'utils/makeHTTPRequest';

const DEFAULT_LOCALE = 'en';
const LOCALE_PATH = process.env.PUBLIC_URL + 'locales/locale';

class Localizer {
  _dictionary = {};

  loadLocale(language = DEFAULT_LOCALE) {
    const url = `${LOCALE_PATH}-${language}.json`;

    return makeHTTPRequest(url).then(data => {
      this._dictionary[language] = data;
    });
  }

  isLocaleLoaded(language) {
    return Boolean(this._dictionary[language]);
  }

  getValue(key, language = DEFAULT_LOCALE) {
    key = Array.isArray(key) ? key : key.split('.');
    return get(this._dictionary, [language].concat(key));
  }
}

const localizer = new Localizer();

export default localizer;
