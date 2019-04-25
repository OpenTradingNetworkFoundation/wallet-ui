import selectors from '../selectors';

import {
  operations,
  formattedOperations,
  formattedPendingOperations,
  formattedPendingByAssetId
} from './fixtures';

const state = {
  externalHistory: {
    operations: operations,
    initialLoad: false
  },
  assets: ['1.3.0', '1.3.1', '1.3.2'].map(id => ({ id, precision: 8 }))
};

describe('External history selectors', () => {
  test('history', () => {
    expect(selectors.history(state)).toBe(state.externalHistory);
  });

  test('initialLoad', () => {
    expect(selectors.initialLoad(state)).toBe(false);
  });

  test('operations', () => {
    expect(selectors.operations(state)).toEqual(formattedOperations);
  });

  test('operations with empty assets', () => {
    expect(selectors.operations({ ...state, assets: [] })).toEqual([]);
  });

  test('pending', () => {
    expect(selectors.pending(state)).toEqual(formattedPendingOperations);
  });

  test('pendingByAssetId', () => {
    expect(selectors.pendingByAssetId(state)).toEqual(
      formattedPendingByAssetId
    );
  });
});
