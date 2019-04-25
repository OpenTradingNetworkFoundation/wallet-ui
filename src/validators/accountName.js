import validate from 'validate.js';

import localizer from 'utils/localizer';
import translate from 'services/translate';

const regExp = /^[a-z]+[a-z0-9-]*$/;

const cheapNameRegexp = {
  vowels: /[aeiouy]/,
  parts: /[0-9-.]/
};

export const LENGTH_PARAMS = { minimum: 3, maximum: 63 };

const lastHyphenValidation = str => str[str.length - 1] !== '-';
const lastDotValidation = str => str[str.length - 1] !== '.';
const startValidation = str => str[0].match(regExp);
const regexpValidation = array =>
  array.split('.').every(part => part.match(regExp));
const cheapNameValidation = str => str.match(cheapNameRegexp.parts);

export default function accountName(value, rules, ...options) {
  [, , options] = options;
  if (!value) {
    return localizer.getValue('validation.accountName.required');
  } else if (validate.validators.length(value, LENGTH_PARAMS)) {
    return translate('validation.accountName.length', {
      minimum: 3,
      maximum: 63
    });
  } else if (!startValidation(value)) {
    return localizer.getValue('validation.accountName.invalid.number');
  } else if (!lastDotValidation(value)) {
    return localizer.getValue('validation.accountName.invalid.dot');
  } else if (!lastHyphenValidation(value)) {
    return localizer.getValue('validation.accountName.invalid.hyphen');
  } else if (!regexpValidation(value)) {
    return localizer.getValue('validation.accountName.invalid.regexp');
  } else if (!cheapNameValidation(value)) {
    return localizer.getValue('validation.accountName.invalid.regexp');
  } else if (options.external && options.external.accountName) {
    return options.external.accountName;
  }

  return null;
}
