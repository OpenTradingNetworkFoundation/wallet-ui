import validate from 'validate.js';
import { isEqual } from 'lodash';

import customValidators from 'validators';

class Validator {
  static init() {
    validate.Promise = Promise;
    Object.assign(validate.validators, customValidators);
  }

  _previousValue = null;
  _previousOptions = null;
  _validationResult = null;
  _firstValidation = true;

  constructor(validationRules = {}) {
    this.validationRules = validationRules;
  }

  validate(value, options = {}) {
    const isNewValue = this._previousValue !== value;
    const isNewOptions = !isEqual(options, this._previousOptions);

    if (isNewValue || isNewOptions || this._firstValidation) {
      // check if we have cached validation result in memory
      const result = validate.single(value, this.validationRules, options);
      this._validationResult = result ? result[0] : result;
      this._previousValue = value;
      this._previousOptions = options;
      this._firstValidation = false;
    }

    return this._validationResult;
  }
}

export default Validator;
