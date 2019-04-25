import validate from 'validate.js';

import translate from 'services/translate';
import AssetAmount from 'src/models/AssetAmount';

const orderValidator = (value, options) => {
  const { maxAmount, asset: { precision, asset }, price } = options;
  const normalizedAmount = AssetAmount.normalize(value, precision);

  const delta = AssetAmount.subtractDecimal(
    value,
    AssetAmount.parse(maxAmount, precision),
    precision
  );

  if (
    validate.validators.numericality(value, { strict: true, greaterThan: 0 })
  ) {
    return translate('validation.number');
    // if passed empty price
  } else if (!price) {
    return translate('validation.placeOrder.emptyPrice');
  } else if (
    validate.validators.numericality(price, { strict: true, greaterThan: 0 })
  ) {
    return translate('validation.placeOrder.priceLessThanZero');
  } else if (maxAmount < normalizedAmount) {
    return translate('validation.placeOrder.insufficient', { delta, asset });
  }
};

export default orderValidator;
