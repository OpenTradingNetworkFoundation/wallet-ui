import { createSelector } from 'reselect';

const blockchainMeta = state => state.blockchainMeta;

const lastIrreversibleBlock = createSelector(
  blockchainMeta,
  meta => meta.lastIrreversibleBlock
);

export default { lastIrreversibleBlock, blockchainMeta };
