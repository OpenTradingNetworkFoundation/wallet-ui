import memoizeOne from 'memoize-one';
import { concat } from 'ramda';

import { ASSET_PRIORITY } from 'enums/asset';

/**
 * Create market string concatenating base and quote with /
 * @param {string} base market base
 * @param {string} quote market quote
 * @returns {string} base/quote
 */
export const createMarket = (base, quote) => `${base} / ${quote}`;

export const combinations = (favoriteMarkets, assets) => {
  const markets = assets
    .map(a => [a, assets.filter(b => b !== a).map(b => [a, b])])
    .map(([, b]) => b)
    .reduce((acc, b) => concat(acc, b), [])
    .filter(([base, quote]) => ASSET_PRIORITY[base] > ASSET_PRIORITY[quote])
    .map(([base, quote]) => ({
      base,
      quote,
      favorite: !!favoriteMarkets[createMarket(base, quote)],
      timeAdded: favoriteMarkets[createMarket(base, quote)]
    }))
    .reduce(
      (acc, market) => {
        return market.favorite
          ? { ...acc, marked: concat(acc.marked, [market]) }
          : { ...acc, unmarked: concat(acc.unmarked, [market]) };
      },
      { marked: [], unmarked: [] }
    );

  const marked = markets.marked.sort(
    (a, b) => new Date(b.timeAdded) - new Date(a.timeAdded)
  );

  return concat(marked, markets.unmarked);
};

export const filterOptions = memoizeOne((options, selectedItem) =>
  options.filter(
    ({ base, quote }) =>
      selectedItem !== '' ? [base, quote].includes(selectedItem) : true
  )
);
