import Validator from 'utils/Validator';

const amountValidator = new Validator({
  assetAmount: true
});

const userNameValidator = new Validator({
  username: true
});

const validate = (fields, meta) => {
  let validation = {
    amount: amountValidator.validate(fields.amount, {
      asset: fields.asset,
      maxAmount: meta.maxAmount
    }),
    username: userNameValidator.validate(fields.username, {
      isUserExist: meta.isUserExist,
      accountName: meta.accountName
    })
  };

  validation.invalid = Boolean(
    Object.keys(validation).filter(key => validation[key]).length
  );

  return validation;
};

export default validate;
