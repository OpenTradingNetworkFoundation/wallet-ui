import cleanMocks from 'src/__utils__/cleanMocks';
import mockMethod from 'src/__utils__/mockMethod';
import * as screenParams from 'utils/screenParams';

import { isMobile, isSmall } from '../breakpoints';

describe('breakpoints service', () => {
  describe('width < 767', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(screenParams, 'getScreenParams', () => ({
        width: 700
      }));
    });

    afterAll(() => cleanMocks([mock]));

    test('check helpers', () => {
      expect(isMobile()).toBe(true);
      expect(isSmall()).toBe(true);
    });
  });

  describe('width is 767', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(screenParams, 'getScreenParams', () => ({
        width: 767
      }));
    });

    afterAll(() => cleanMocks([mock]));

    test('check helpers', () => {
      expect(isMobile()).toBe(true);
      expect(isSmall()).toBe(true);
    });
  });

  describe('width between 767 and 880', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(screenParams, 'getScreenParams', () => ({
        width: 768
      }));
    });

    afterAll(() => cleanMocks([mock]));

    test('check helpers', () => {
      expect(isMobile()).toBe(false);
      expect(isSmall()).toBe(true);
    });
  });

  describe('width is 880', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(screenParams, 'getScreenParams', () => ({
        width: 880
      }));
    });

    afterAll(() => cleanMocks([mock]));

    test('check helpers', () => {
      expect(isMobile()).toBe(false);
      expect(isSmall()).toBe(true);
    });
  });

  describe('width between 880 and inf', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(screenParams, 'getScreenParams', () => ({
        width: 881
      }));
    });

    afterAll(() => cleanMocks([mock]));

    test('check helpers', () => {
      expect(isMobile()).toBe(false);
      expect(isSmall()).toBe(false);
    });
  });
});
