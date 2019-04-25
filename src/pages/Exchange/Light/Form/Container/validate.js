import Validator from 'utils/Validator';

const toAmountValidator = new Validator({
  assetAmount: {
    ignoreMaxCheck: true
  }
});

const fromAmountValidator = new Validator({
  assetAmount: true
});

const validate = (fields, meta) => {
  const validation = {
    fromAmount: fromAmountValidator.validate(fields.fromAmount, {
      asset: fields.fromAsset,
      maxAmount: meta.fromMaxAmount
    }),
    toAmount: toAmountValidator.validate(fields.toAmount, {
      asset: fields.toAsset,
      maxAvailableAmount: meta.availableAmount
    })
  };

  validation.invalid = Boolean(
    Object.keys(validation).filter(key => validation[key]).length
  );

  return validation;
};

export default validate;
