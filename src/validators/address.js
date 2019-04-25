import translate from 'services/translate';

export default function address(value, rules, ...options) {
  [, , options] = options;

  if (!value) {
    return translate('page.detokenize.validation.address.empty');
  } else if (!options.isValid) {
    return translate('page.detokenize.validation.address.invalid');
  }
}
