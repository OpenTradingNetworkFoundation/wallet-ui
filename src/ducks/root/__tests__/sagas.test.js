import { call, takeEvery } from 'redux-saga/effects';

import { resetStore, watchRoot, resetLocalStorage } from '../sagas';
import actions from '../actions';

describe('Root sagas', () => {
  test('watch root', () => {
    const generator = watchRoot();
    expect(generator.next().value).toEqual(
      takeEvery(actions.resetStore, resetStore)
    );
    expect(generator.next().done).toBe(true);
  });

  describe('resetStore saga', () => {
    test('saga', () => {
      const generator = resetStore();

      expect(generator.next().value).toEqual(call(resetLocalStorage));
      expect(generator.next().done).toBe(true);
    });
  });
});
