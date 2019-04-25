import orderValidator from 'validators/orderValidator';
import translate from 'services/translate';

export default function sellOrder(value, rules, ...options) {
  [, , options] = options;

  // if passed empty value
  if (!value) {
    return translate('validation.placeOrder.emptyAmount');
  } else {
    return orderValidator(value, options);
  }
}
