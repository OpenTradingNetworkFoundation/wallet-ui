import selectors from '../selectors';

import { assets, profile, entries, formattedHistory } from './fixtures';

describe('Internal History selectors', () => {
  const state = {
    internalHistory: {
      initialLoad: false,
      operations: formattedHistory
    },
    blockchainMeta: {
      lastIrreversibleBlock: 30
    },
    assets,
    profile
  };

  test('histoty', () => {
    expect(selectors.history(state)).toEqual(state.internalHistory);
  });

  test('initial load', () => {
    expect(selectors.initialLoad(state)).toEqual(false);
  });

  test('operations', () => {
    expect(selectors.operations(state)).toEqual(
      state.internalHistory.operations
    );
  });

  test('mostRecentId', () => {
    expect(selectors.mostRecentId(state)).toEqual('1.11.1');
  });

  test('entries', () => {
    expect(selectors.entries(state)).toEqual(entries);
  });
});
