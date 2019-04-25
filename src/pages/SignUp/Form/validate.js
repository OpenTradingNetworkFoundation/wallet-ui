import Validator from 'utils/Validator';

const accountNameValidator = new Validator({
  accountName: true
});

const isEmpty = v => v;
const compact = array => array.filter(isEmpty);

const validate = ({ accountName }, options) => {
  const validation = {
    accountName: accountNameValidator.validate(accountName, options)
  };

  const invalid = !!compact(Object.values(validation)).length;

  return {
    ...validation,
    invalid
  };
};

export default validate;
