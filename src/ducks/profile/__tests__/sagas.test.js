import { call, takeEvery, put, select } from 'redux-saga/effects';

import { errorHandlerActions } from 'ducks/errorHandler';
import { getAccounts } from 'api/accountApi';

import actions from '../actions';
import selectors from '../selectors';
import { watch, loadProfiles } from '../sagas';

describe('Profile sagas', () => {
  describe('Load profiles', () => {
    test('loadProfiles saga without cache', () => {
      const ids = [1, 2];
      const generator = loadProfiles(actions.loadProfiles(ids));
      const accounts = [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        }
      ];

      expect(generator.next().value).toEqual(select(selectors.profileIds));
      expect(generator.next([]).value).toEqual(call(getAccounts, ids));

      expect(generator.next(accounts).value).toEqual(
        put(actions.loadProfilesSuccess(accounts))
      );
    });

    test('loadProfiles saga with cache', () => {
      const ids = [1, 2];
      const generator = loadProfiles(actions.loadProfiles(ids));

      expect(generator.next().value).toEqual(select(selectors.profileIds));

      expect(generator.next([1, 2]).done).toEqual(true);
    });

    test('loadMeta error handling', () => {
      const generator = loadProfiles(actions.loadProfiles([]));
      generator.next();

      expect(generator.throw('error').value).toEqual(
        put(errorHandlerActions.handleNodeError('error'))
      );
    });
  });

  test('loadProfiles watcher', () => {
    const generator = watch();
    expect(generator.next().value).toEqual(
      takeEvery(actions.loadProfiles, loadProfiles)
    );
  });
});
