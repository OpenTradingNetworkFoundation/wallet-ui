import { prop, compose, curry, pick, partialRight } from 'ramda';
import * as math from 'mathjs';

import AssetAmount from 'src/models/AssetAmount';

const basePrice = compose(prop('base'), prop('sell_price'));
const quotePrice = compose(prop('quote'), prop('sell_price'));

const baseAssetId = compose(prop('asset_id'), basePrice);
const baseAmount = compose(prop('amount'), basePrice);
const quoteAmount = compose(prop('amount'), quotePrice);
const amountForSale = prop('for_sale');

const format = precision =>
  partialRight(math.format, [
    {
      notation: 'fixed',
      precision
    }
  ]);

const price = compose(format(8), math.number, math.divide);

const baseToSell = order => {
  const forSale = amountForSale(order);
  const base = baseAmount(order);
  const quote = quoteAmount(order);
  return math.floor(forSale / base * quote);
};

const quoteToSell = amountForSale;

const parseBidBaseQuote = curry((bprecision, qprecision, order) => ({
  ...order,
  base: AssetAmount.parse(quoteToSell(order), bprecision),
  quote: AssetAmount.parse(baseAmount(order), qprecision),
  quoteAmount: AssetAmount.parse(baseToSell(order), bprecision),
  baseAmount: AssetAmount.parse(quoteToSell(order), qprecision)
}));

const parseAskBaseQuote = curry((bprecision, qprecision, order) => ({
  ...order,
  base: AssetAmount.parse(baseToSell(order), bprecision),
  quote: AssetAmount.parse(quoteAmount(order), qprecision),
  quoteAmount: AssetAmount.parse(quoteToSell(order), qprecision),
  baseAmount: AssetAmount.parse(baseToSell(order), bprecision)
}));

const calculateAskPrice = curry((bprecision, qprecision, order) => ({
  ...order,
  price: AssetAmount.round(
    price(
      AssetAmount.parse(baseAmount(order), bprecision),
      AssetAmount.parse(quoteAmount(order), qprecision)
    ),
    6,
    Math.floor
  )
}));

const calculateBidPrice = curry((bprecision, qprecision, order) => ({
  ...order,
  price: AssetAmount.round(
    price(
      AssetAmount.parse(quoteAmount(order), qprecision),
      AssetAmount.parse(baseAmount(order), bprecision)
    ),
    6,
    Math.ceil
  )
}));

const pickRequiredFields = pick([
  'quote',
  'base',
  'price',
  'baseAmount',
  'quoteAmount'
]);

const formatBidOrder = curry((bprecision, qprecision, order) => {
  return compose(
    pickRequiredFields,
    parseBidBaseQuote(bprecision, qprecision),
    calculateBidPrice(bprecision, qprecision)
  )(order);
});

const formatAskOrder = curry((bprecision, qprecision, order) =>
  compose(
    pickRequiredFields,
    parseAskBaseQuote(bprecision, qprecision),
    calculateAskPrice(bprecision, qprecision)
  )(order)
);

export const groupOrders = curry((base, quote, orders) => {
  return orders.reduce(
    (ordersAcc, order) => {
      return {
        ...ordersAcc,
        // sell
        asks:
          baseAssetId(order) === base.id
            ? ordersAcc.asks.concat(
                formatBidOrder(base.precision, quote.precision, order)
              )
            : ordersAcc.asks,
        // buy
        bids:
          baseAssetId(order) === quote.id
            ? ordersAcc.bids.concat(
                formatAskOrder(base.precision, quote.precision, order)
              )
            : ordersAcc.bids
      };
    },
    { bids: [], asks: [] }
  );
});
