import { Apis } from 'bitsharesjs-ws';

/**
 * We request ticker invert here, because of 🤷‍
 */
export const fetchTicker = (base, quote) =>
  Apis.instance()
    .db_api()
    .exec('get_ticker', [quote, base]);

export const fetchVolume = (base, quote) =>
  Apis.instance()
    .db_api()
    .exec('get_24_volume', [quote, base]);

export const tickerVolume = fetchTicker;

export const getTradeHistory = (base, quote) =>
  Apis.instance()
    .history_api()
    .exec('get_fill_order_history', [base.id, quote.id, 1000]);
