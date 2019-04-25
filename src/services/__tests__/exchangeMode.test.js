import mockMethod from 'src/__utils__/mockMethod';
import localStorage from 'utils/localStorage';

import { saveExchangeMode, isProExchangeMode } from '../exchangeMode';

describe('exchangeMode service', () => {
  describe('saveExchangeMode', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(localStorage, 'set');
    });

    afterAll(() => mock.restoreMock());

    test('save', () => {
      saveExchangeMode(true);
      saveExchangeMode(false);

      expect(mock).toHaveBeenNthCalledWith(1, 'isProExchangeMode', true);
      expect(mock).toHaveBeenNthCalledWith(2, 'isProExchangeMode', false);
    });
  });

  describe('isProExchangeMode', () => {
    describe('when undefined', () => {
      let mock;

      beforeAll(() => {
        mock = mockMethod(localStorage, 'get');
      });

      afterAll(() => mock.restoreMock());

      test('save', () => {
        expect(isProExchangeMode()).toBe(false);
        expect(mock).toBeCalledWith('isProExchangeMode');
      });
    });

    describe('when false', () => {
      let mock;

      beforeAll(() => {
        mock = mockMethod(localStorage, 'get', () => false);
      });

      afterAll(() => mock.restoreMock());

      test('save', () => {
        expect(isProExchangeMode()).toBe(false);
        expect(mock).toBeCalledWith('isProExchangeMode');
      });
    });

    describe('when true', () => {
      let mock;

      beforeAll(() => {
        mock = mockMethod(localStorage, 'get', () => true);
      });

      afterAll(() => mock.restoreMock());

      test('save', () => {
        expect(isProExchangeMode()).toBe(true);
        expect(mock).toBeCalledWith('isProExchangeMode');
      });
    });
  });
});
