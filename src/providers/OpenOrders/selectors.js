import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import { curry, pick, path } from 'ramda';

import AssetAmount from 'models/AssetAmount';
import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';
import { ASSET_PRIORITY } from 'enums/asset';

const PRICE_PRECISION = 6;

const getPrice = (base, quote) =>
  AssetAmount.round(
    AssetAmount.parse(quote.amount, quote.precision) /
      AssetAmount.parse(base.amount, base.precision),
    PRICE_PRECISION
  );

export const plainOrders = state => state.orders;

export const orderCount = createSelector(plainOrders, orders => orders.length);

const getField = curry((field, asset, order) =>
  path(['sell_price', asset, field])(order)
);
const getAssetId = getField('asset_id');
const getAmount = getField('amount');

const formatAsset = (asset, amount) => ({
  ...pick(['id', 'name', 'displayName', 'isTokenized', 'precision'])(asset),
  amount,
  displayAmount: AssetAmount.parse(amount, asset.precision)
});

export const orders = memoizeOne((state, balancesMap) => {
  const orders = plainOrders(state);

  return orders
    .sort((a, b) => new Date(b.expiration) - new Date(a.expiration))
    .map(o => {
      const baseAsset = formatAsset(
        balancesMap[getAssetId('base', o)],
        getAmount('base', o)
      );
      const quoteAsset = formatAsset(
        balancesMap[getAssetId('quote', o)],
        getAmount('quote', o)
      );
      const isSellOrder =
        ASSET_PRIORITY[baseAsset.name] > ASSET_PRIORITY[quoteAsset.name];

      const base = isSellOrder ? baseAsset : quoteAsset;
      const quote = isSellOrder ? quoteAsset : baseAsset;

      const percentage = Math.ceil(100 - 100 * o.for_sale / baseAsset.amount);

      return {
        id: o.id,
        expiration: o.expiration,
        price: getPrice(base, quote),
        type: isSellOrder ? ORDER_TYPE.SELL : ORDER_TYPE.BUY,
        percentage,
        base,
        quote
      };
    });
});
