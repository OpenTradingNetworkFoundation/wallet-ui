import {
  prop,
  compose,
  path,
  partialRight,
  curry,
  concat,
  propOr
} from 'ramda';
import * as math from 'mathjs';

import toLocalTime from 'utils/toLocalTime';
import AssetAmount from 'src/models/AssetAmount';
import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';

const formatNumber = precision =>
  partialRight(math.format, [
    {
      notation: 'fixed',
      precision
    }
  ]);
const parse = precision => partialRight(AssetAmount.parse, [precision]);

const convertTime = compose(toLocalTime('YYYY-MM-D HH:mm:ss'), prop('time'));

const baseField = prop('pays');
const quoteField = prop('receives');

const baseAmountProp = compose(prop('amount'), baseField);
const quoteAmountProp = compose(prop('amount'), quoteField);

const baseId = compose(prop('asset_id'), baseField);

export const filterOdd = (item, n) => !(n % 2);

export const formatTrade = curry((base, quote, tradeItem) => {
  const trade = prop('op', tradeItem);
  const type = baseId(trade) === base.id ? ORDER_TYPE.BUY : ORDER_TYPE.SELL;
  const sequence = path(['key', 'sequence'], tradeItem);
  const price = compose(
    formatNumber(base.precision),
    math.number,
    math.fraction
  );
  const baseAmount = compose(parse(base.precision), baseAmountProp);
  const quoteAmount = compose(parse(quote.precision), quoteAmountProp);

  return {
    price:
      type === ORDER_TYPE.SELL
        ? price(baseAmountProp(trade), quoteAmountProp(trade))
        : price(quoteAmountProp(trade), baseAmountProp(trade)),
    value: type === ORDER_TYPE.SELL ? quoteAmount(trade) : baseAmount(trade),
    amount: type === ORDER_TYPE.SELL ? baseAmount(trade) : quoteAmount(trade),
    date: convertTime(tradeItem),
    type,
    key: math.abs(sequence)
  };
});

export const first = propOr(-Infinity, '0');
export const second = propOr(-Infinity, '1');
export const third = propOr(-Infinity, '2');

const f = (comparator, array) => {
  if (
    comparator === first(array) ||
    comparator === second(array) ||
    comparator === third(array)
  ) {
    return array;
  } else if (comparator > first(array)) {
    return [comparator, first(array), second(array)];
  } else if (comparator > second(array)) {
    return [first(array), comparator, second(array)];
  } else if (comparator > third(array)) {
    return [first(array), second(array), comparator];
  }

  return array;
};

export const tradeReducer = ({ trades, sell, buy }, trade) => {
  const comparator = math.number(trade.value);
  return {
    trades: concat(trades, [trade]),
    buy: trade.type === ORDER_TYPE.BUY ? f(comparator, buy) : buy,
    sell: trade.type === ORDER_TYPE.SELL ? f(comparator, sell) : sell
  };
};
