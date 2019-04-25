import { createSelector } from 'reselect';
import { prop } from 'ramda';

import { formatVestingBalances } from './formatters';

export const balances = prop('balances');

export const formattedBalances = createSelector(
  balances,
  formatVestingBalances
);

export const hasVestingBalances = createSelector(
  balances,
  balances => balances.length > 0
);
