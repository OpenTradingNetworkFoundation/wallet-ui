import translate from 'services/translate';
import Validator from 'utils/Validator';

export const amountValidator = new Validator({
  assetAmount: {
    minAmount: {
      message: minValue =>
        translate('page.detokenize.validation.amount.minValue', { minValue })
    }
  }
});

export const addressValidator = new Validator({
  address: true
});

const validate = (fields, meta) => {
  let result = {
    amount: amountValidator.validate(fields.amount, {
      asset: fields.asset,
      maxAmount: meta.maxAmount,
      minAmount: meta.externalFee
    }),
    address: addressValidator.validate(fields.address, {
      isValid: meta.isAddressValid
    })
  };

  result.invalid = Boolean(
    Object.keys(result).filter(key => result[key]).length
  );

  return result;
};

export default validate;
