import localizer from 'utils/localizer';
import renderTemplate from 'helpers/renderTemplate';

export default function getErrorMessage(key, params) {
  let error = localizer.getValue(`errors.${key}`);
  error = error ? error : localizer.getValue('errors.unknown_error');

  return {
    ...error,
    message: params ? renderTemplate(error.message, params) : error.message
  };
}
