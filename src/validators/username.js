import localizer from 'utils/localizer';

export default function username(value, rules, ...options) {
  [, , options] = options;

  if (!value) {
    return localizer.getValue('validation.username.required');
  } else if (value === options.accountName) {
    return localizer.getValue('validation.username.ownAccount');
  } else if (!options.isUserExist) {
    return localizer.getValue('page.send.error.user_not_exist');
  }
}
