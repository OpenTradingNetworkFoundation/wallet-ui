import { createSelector } from 'reselect';
import { get } from 'lodash';
import { prop, partialRight, propOr } from 'ramda';

import AssetAmount from 'models/AssetAmount';
import { balanceSelectors } from 'ducks/balance';

import { groupOrders } from './groupOrders';

const ORDER_PRICE_PRECISION = 6;

const orderBook = prop('orderBook');
const sell = createSelector(orderBook, prop('sell'));
const stateLimitOrders = createSelector(orderBook, prop('limitOrders'));
const baseId = createSelector(orderBook, prop('baseId'));
const quoteId = createSelector(orderBook, prop('quoteId'));

const assets = createSelector(
  baseId,
  quoteId,
  balanceSelectors.balances,
  (base, quote, balances) => {
    return {
      base: balances.find(balance => balance.id === base),
      quote: balances.find(balance => balance.id === quote)
    };
  }
);

const groupedLimitOrders = createSelector(
  stateLimitOrders,
  assets,
  (orders, assets) => groupOrders(assets.base, assets.quote, orders)
);

const invertedLimitOrders = createSelector(
  stateLimitOrders,
  assets,
  (orders, assets) => groupOrders(assets.quote, assets.base, orders)
);

const formatOrders = (orders, assets) => {
  const baseAsset = assets.base;
  const quoteAsset = assets.quote;
  const head = orders.slice(0, 1);
  const tail = orders.slice(1);

  const precisionProp = propOr('8', 'precision');
  const addBase = partialRight(AssetAmount.sumDecimal, [
    precisionProp(baseAsset)
  ]);
  const addQuote = partialRight(AssetAmount.sumDecimal, [
    precisionProp(quoteAsset)
  ]);

  const formatted = tail.reduce((res, order) => {
    const lastIndex = res.length - 1;
    const lastOrder = res[lastIndex];

    if (lastOrder.price === order.price) {
      const base = addBase(order.base, lastOrder.base);
      const quote = addQuote(order.quote, lastOrder.quote);
      const baseAmount = addBase(order.baseAmount, lastOrder.baseAmount);
      const quoteAmount = addQuote(order.quoteAmount, lastOrder.quoteAmount);

      return res.slice(0, lastIndex).concat({
        ...order,
        price: lastOrder.price,
        base,
        quote,
        baseAmount,
        quoteAmount
      });
    } else {
      return res.concat(order);
    }
  }, head);

  return formatted.reduce((res, order, index) => {
    const prevOrder = res[index - 1];
    return res.concat({
      ...order,
      base: prevOrder ? addBase(prevOrder.base, order.base) : order.base,
      quote: AssetAmount.round(order.base, quoteAsset.precision),
      baseTotal: prevOrder
        ? addBase(prevOrder.baseTotal, order.baseAmount)
        : order.baseAmount,
      quoteTotal: prevOrder
        ? addQuote(prevOrder.quoteTotal, order.quoteAmount)
        : order.quoteAmount
    });
  }, []);
};

const limitOrders = createSelector(
  groupedLimitOrders,
  assets,
  (roundedOrders, assets) => {
    const asks = roundedOrders.asks;
    const bids = roundedOrders.bids;
    return {
      asks: formatOrders(asks, assets),
      bids: formatOrders(bids, assets)
    };
  }
);

const invertLimitOrders = createSelector(
  invertedLimitOrders,
  assets,
  (orders, assets) => {
    return {
      asks: formatOrders(orders.asks, assets),
      bids: formatOrders(orders.bids, assets)
    };
  }
);

const averagePrice = createSelector(
  limitOrders,
  assets,
  (orderBook, assets) => {
    if (!assets.base && !assets.quote) {
      return '0';
    }

    const bidPrice = +AssetAmount.normalize(
      get(orderBook, 'bids.0.price', '0'),
      assets.base.precision
    );
    const askPrice = +AssetAmount.normalize(
      get(orderBook, 'asks.0.price', '0'),
      assets.base.precision
    );

    const average = AssetAmount.parse(
      bidPrice && askPrice ? (bidPrice + askPrice) / 2 : bidPrice + askPrice,
      assets.base.precision
    );

    return AssetAmount.round(average, ORDER_PRICE_PRECISION);
  }
);

export default {
  orderBook,
  sell,
  averagePrice,
  limitOrders,
  invertLimitOrders,
  assets
};
