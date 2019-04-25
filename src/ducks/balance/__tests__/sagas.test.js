import { call, takeEvery, put, select, take } from 'redux-saga/effects';

import { errorHandlerActions } from 'ducks/errorHandler';
import { accountSelectors } from 'ducks/account';
import { assetsSelectors, assetsActions } from 'ducks/assets';
import { getBalance } from 'api/balanceApi';

import actions from '../actions';
import { watch, loadBalance } from '../sagas';

const assets = [1, 2, 3];
const balances = [4, 5, 6];

describe('balance sagas', () => {
  describe('load balance', () => {
    test('success', () => {
      const generator = loadBalance(actions.loadBalance());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountId)
      );

      expect(generator.next('1.2.1').value).toEqual(
        select(assetsSelectors.getAssets)
      );

      expect(generator.next(assets).value).toEqual(
        call(getBalance, '1.2.1', assets)
      );

      expect(generator.next(balances).value).toEqual(
        put(actions.loadBalanceSuccess(balances))
      );

      expect(generator.next().done).toBe(true);
    });

    test('initial load', () => {
      const generator = loadBalance(actions.loadBalance());

      expect(generator.next().value).toEqual(
        select(accountSelectors.accountId)
      );

      expect(generator.next('1.2.1').value).toEqual(
        select(assetsSelectors.getAssets)
      );

      expect(generator.next([]).value).toEqual(
        take(assetsActions.loadAssetsSuccess)
      );

      expect(generator.next().value).toEqual(select(assetsSelectors.getAssets));

      expect(generator.next(assets).value).toEqual(
        call(getBalance, '1.2.1', assets)
      );

      expect(generator.next(balances).value).toEqual(
        put(actions.loadBalanceSuccess(balances))
      );

      expect(generator.next().done).toBe(true);
    });

    test('error', () => {
      const generator = loadBalance(actions.loadBalance());
      generator.next();

      expect(generator.throw('error').value).toEqual(
        put(errorHandlerActions.handleNodeError('error'))
      );
    });
  });

  test('watch saga', () => {
    const generator = watch();
    expect(generator.next().value).toEqual(
      takeEvery(actions.loadBalance, loadBalance)
    );
  });
});
