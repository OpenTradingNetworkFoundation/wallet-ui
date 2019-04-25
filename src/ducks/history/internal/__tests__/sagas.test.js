import {
  call,
  takeEvery,
  put,
  select,
  takeLatest,
  take
} from 'redux-saga/effects';

import { errorHandlerActions } from 'ducks/errorHandler';
import { accountSelectors } from 'src/ducks/account';
import { getAccountHistory } from 'api/historyApi';
import { blockchainMetaActions } from 'src/ducks/blockchain-meta';
import { profileActions } from 'src/ducks/profile';

import actions from '../actions';
import { watch, loadHistory, updateHistory } from '../sagas';
import selectors from '../selectors';

import { history, formattedHistory } from './fixtures';

describe('Internal History sagas', () => {
  describe('Load history', () => {
    test('load history success', () => {
      const generator = loadHistory(actions.loadHistory());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountId)
      );
      expect(generator.next('1.2.1').value).toEqual(
        call(getAccountHistory, { id: '1.2.1' })
      );

      expect(generator.next(history).value).toEqual(
        put(profileActions.loadProfiles(['1.2.1', '1.2.6', '1.2.20', '1.2.17']))
      );

      expect(generator.next().value).toEqual(
        put(blockchainMetaActions.loadMeta())
      );

      expect(generator.next().value).toEqual(
        put(actions.loadHistorySuccess(formattedHistory))
      );
    });

    test('loadHistory error handling', () => {
      const generator = loadHistory(actions.loadHistory());
      generator.next();

      expect(generator.throw('error').value).toEqual(
        put(errorHandlerActions.handleNodeError('error'))
      );
    });
  });

  describe('Update history', () => {
    test('update history success', () => {
      const generator = updateHistory(actions.updateHistory());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountId)
      );
      expect(generator.next('1.2.1').value).toEqual(
        select(selectors.initialLoad)
      );
      expect(generator.next(false).value).toEqual(select(selectors.operations));

      expect(generator.next(formattedHistory.slice(1)).value).toEqual(
        call(getAccountHistory, { id: '1.2.1' })
      );

      expect(generator.next(history.slice(0, 1)).value).toEqual(
        put(actions.updateHistorySuccess(formattedHistory.slice(0, 1)))
      );

      expect(generator.next().value).toEqual(
        put(profileActions.loadProfiles(['1.2.1', '1.2.6']))
      );

      expect(generator.next().value).toEqual(
        put(blockchainMetaActions.loadMeta())
      );
    });

    test('update history without update', () => {
      const generator = updateHistory(actions.updateHistory());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountId)
      );
      expect(generator.next('1.2.1').value).toEqual(
        select(selectors.initialLoad)
      );
      expect(generator.next(false).value).toEqual(select(selectors.operations));

      expect(generator.next(formattedHistory.slice(1)).value).toEqual(
        call(getAccountHistory, { id: '1.2.1' })
      );

      expect(generator.next([]).value).toEqual(
        put(blockchainMetaActions.loadMeta())
      );
    });

    test('update history success initial load', () => {
      const generator = updateHistory(actions.updateHistory());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountId)
      );
      expect(generator.next('1.2.1').value).toEqual(
        select(selectors.initialLoad)
      );
      expect(generator.next(true).value).toEqual(select(selectors.operations));

      expect(generator.next().value).toEqual(take(actions.loadHistorySuccess));

      expect(generator.next().value).toEqual(select(selectors.operations));

      expect(generator.next(formattedHistory.slice(1)).value).toEqual(
        call(getAccountHistory, { id: '1.2.1' })
      );

      expect(generator.next(history.slice(0, 1)).value).toEqual(
        put(actions.updateHistorySuccess(formattedHistory.slice(0, 1)))
      );

      expect(generator.next().value).toEqual(
        put(profileActions.loadProfiles(['1.2.1', '1.2.6']))
      );

      expect(generator.next().value).toEqual(
        put(blockchainMetaActions.loadMeta())
      );
    });

    test('updateHistory error handling', () => {
      const generator = updateHistory(actions.updateHistory());
      generator.next();

      expect(generator.throw('error').value).toEqual(
        put(errorHandlerActions.handleNodeError('error'))
      );
    });
  });

  test('watcher', () => {
    const generator = watch();

    expect(generator.next().value).toEqual(
      takeEvery(actions.loadHistory, loadHistory)
    );
    expect(generator.next().value).toEqual(
      takeLatest(actions.updateHistory, updateHistory)
    );
  });
});
