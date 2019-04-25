import Validator from 'utils/Validator';
import { compose } from 'ramda';

const buyValidator = new Validator({
  buyOrder: true
});

const sellValidator = new Validator({
  sellOrder: true
});

const sell = ({ amount, price, asset, maxAmount }) => ({
  amount: sellValidator.validate(amount, {
    asset,
    maxAmount,
    price
  })
});

const buy = ({ total, price, asset, maxAmount }) => ({
  amount: buyValidator.validate(total, {
    asset,
    maxAmount,
    price
  })
});

const validate = validation => ({
  ...validation,
  invalid: Boolean(
    Object.keys(validation).filter(key => validation[key]).length
  )
});

export const sellValidate = compose(validate, sell);
export const buyValidate = compose(validate, buy);
