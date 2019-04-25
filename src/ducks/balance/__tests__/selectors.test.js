import selectors from '../selectors';

import {
  assets,
  balances,
  balancesNames,
  tokenized,
  otn,
  native,
  notEmpty,
  pendingOperation,
  processedOperation,
  notEmptyTokenizedWithPending,
  notEmptyNames,
  core,
  exchangeScheme,
  balancesMap
} from './fixtures';

const state = {
  balance: {
    isFetching: false,
    assets
  },
  externalHistory: {
    operations: [processedOperation]
  },
  assets: ['1.3.0', '1.3.1', '1.3.2'].map(id => ({ id, precision: 8 }))
};

describe('balance selectors', () => {
  test('plain', () => {
    expect(selectors.plain(state)).toBe(state.balance.assets);
  });

  test('balances', () => {
    expect(selectors.balances(state)).toEqual(balances);
  });

  test('balances Names', () => {
    expect(selectors.balanceNames(state)).toEqual(balancesNames);
  });

  test('tokenized', () => {
    expect(selectors.tokenized(state)).toEqual(tokenized);
  });

  test('hasTokenized = true', () => {
    expect(selectors.hasTokenized(state)).toEqual(true);
  });

  test('hasTokenized = false', () => {
    expect(
      selectors.hasTokenized({ balance: { isFetching: false, assets: [otn] } })
    ).toEqual(false);
  });

  test('native', () => {
    expect(selectors.native(state)).toEqual(native);
  });

  test('notEmpty', () => {
    expect(selectors.notEmpty(state)).toEqual(notEmpty);
  });

  test('hasBalances = true', () => {
    expect(selectors.hasBalances(state)).toEqual(true);
  });

  test('hasBalances = false', () => {
    expect(
      selectors.hasBalances({ balance: { isFetching: false, assets: [otn] } })
    ).toEqual(false);
  });

  test('notEmptyTokenized', () => {
    expect(selectors.notEmptyTokenized(state)).toEqual(notEmpty);
  });

  test('notEmptyTokenizedWithPending has no pending', () => {
    expect(selectors.notEmptyTokenizedWithPending(state)).toEqual(notEmpty);
  });

  test('notEmptyTokenizedWithPending has pending', () => {
    const stateWithPending = {
      ...state,
      externalHistory: { operations: [pendingOperation, processedOperation] }
    };
    expect(selectors.notEmptyTokenizedWithPending(stateWithPending)).toEqual(
      notEmptyTokenizedWithPending
    );
  });

  test('hasNotEmptyTokenized = true', () => {
    expect(selectors.hasNotEmptyTokenized(state)).toEqual(true);
  });

  test('hasNotEmptyTokenized = false', () => {
    expect(
      selectors.hasNotEmptyTokenized({
        balance: { isFetching: false, assets: [otn] }
      })
    ).toEqual(false);
  });

  test('notEmptyNames', () => {
    expect(selectors.notEmptyNames(state)).toEqual(notEmptyNames);
  });

  test('core', () => {
    expect(selectors.core(state)).toEqual(core);
  });

  test('exchangeScheme', () => {
    expect(selectors.exchangeScheme(state)).toEqual(exchangeScheme);
  });

  test('balancesMap', () => {
    expect(selectors.balancesMap(state)).toEqual(balancesMap);
  });
});
