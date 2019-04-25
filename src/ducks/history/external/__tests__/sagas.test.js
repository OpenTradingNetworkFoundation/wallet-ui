import { call, put, select, takeLatest, take } from 'redux-saga/effects';

import { errorHandlerActions } from 'ducks/errorHandler';
import { accountSelectors } from 'src/ducks/account';
import { getOperations } from 'api/gatewayApi';
import { serviceStatusActions } from 'ducks/serviceStatus';

import actions from '../actions';
import { watch, loadHistory } from '../sagas';

import { apiOperations, operations } from './fixtures';

describe('External History sagas', () => {
  describe('Load history', () => {
    test('success', () => {
      const generator = loadHistory(actions.loadHistory());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountPlainId)
      );
      expect(generator.next('1.2.1').value).toEqual(
        call(getOperations, '1.2.1')
      );

      expect(generator.next(apiOperations).value).toEqual(
        put(actions.loadHistorySuccess({ operations }))
      );

      expect(generator.next().done).toBe(true);
    });

    test('success for empty history', () => {
      const generator = loadHistory(actions.loadHistory());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountPlainId)
      );
      expect(generator.next('1.2.1').value).toEqual(
        call(getOperations, '1.2.1')
      );

      expect(generator.next([]).done).toBe(true);
    });

    test('error', () => {
      const generator = loadHistory(actions.loadHistory());
      generator.next();

      expect(generator.throw('error').value).toEqual(
        put(errorHandlerActions.handleGatewayError('error'))
      );
    });
  });

  test('watcher', () => {
    const generator = watch();

    expect(generator.next().value).toEqual(
      take(serviceStatusActions.gatewayIsActive)
    );

    expect(generator.next().value).toEqual(
      takeLatest(actions.loadHistory, loadHistory)
    );
  });
});
