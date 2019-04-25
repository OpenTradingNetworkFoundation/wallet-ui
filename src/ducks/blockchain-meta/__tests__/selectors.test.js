import selectors from '../selectors';

describe('Blockchain Meta selectors', () => {
  const state = {
    blockchainMeta: {
      lastIrreversibleBlock: 1
    }
  };

  test('blockchainMeta', () => {
    expect(selectors.blockchainMeta(state)).toEqual(state.blockchainMeta);
  });

  test('lastIrreversibleBlock', () => {
    expect(selectors.lastIrreversibleBlock(state)).toEqual(
      state.blockchainMeta.lastIrreversibleBlock
    );
  });
});
