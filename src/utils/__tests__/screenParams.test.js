import { getScreenParams } from '../screenParams';

describe('screenParams', () => {
  test('getScreenParams', () => {
    expect(getScreenParams()).toEqual({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
});
