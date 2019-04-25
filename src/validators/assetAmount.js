import validate from 'validate.js';
import { isFunction } from 'lodash';

import AssetAmount from 'src/models/AssetAmount';
import localizer from 'utils/localizer';
import translate from 'services/translate';

export default function assetAmount(value, rules, ...options) {
  [, , options] = options;

  const {
    maxAmount,
    minAmount,
    maxAvailableAmount,
    asset: { precision }
  } = options;

  const normalizedAmount = AssetAmount.normalize(value, precision);
  const delta = AssetAmount.parse(normalizedAmount - maxAmount, precision);
  const maxAvailableDelta = AssetAmount.parse(
    normalizedAmount - maxAvailableAmount,
    precision
  );
  const limit = AssetAmount.parse(maxAvailableAmount, precision);

  if (!value) {
    return localizer.getValue('validation.assetAmount.required');
  } else if (
    validate.validators.numericality(value, { strict: true, greaterThan: 0 })
  ) {
    return localizer.getValue('validation.number');
  } else if (maxAmount < normalizedAmount && !rules.ignoreMaxCheck) {
    return translate('validation.assetAmount.insufficient', { delta });
  } else if (maxAvailableAmount && +maxAvailableAmount < +normalizedAmount) {
    return translate('validation.assetAmount.orderBookLimit', {
      delta: maxAvailableDelta,
      limit
    });
  } else if (rules.minAmount && normalizedAmount - minAmount < 0) {
    return isFunction(rules.minAmount.message)
      ? rules.minAmount.message(AssetAmount.parse(minAmount, precision))
      : rules.minAmount.message;
  }

  return null;
}
