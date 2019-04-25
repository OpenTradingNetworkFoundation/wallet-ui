import addressValidationSelectors from '../selectors';

describe('address validations selectors', () => {
  test('addressValidation', () => {
    expect(
      addressValidationSelectors.addressValidation({
        addressValidation: { valid: false }
      })
    ).toEqual({ valid: false });
  });
});
