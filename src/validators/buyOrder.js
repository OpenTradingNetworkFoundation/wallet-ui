import orderValidator from 'validators/orderValidator';
import translate from 'services/translate';

export default function buyOrder(value, rules, ...options) {
  [, , options] = options;

  // if passed empty value
  if (!value) {
    return translate('validation.placeOrder.emptyPrice');
  } else {
    return orderValidator(value, options);
  }
}
