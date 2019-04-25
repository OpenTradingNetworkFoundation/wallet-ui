import { Apis } from 'bitsharesjs-ws';

export function getAccountHistory({ id, stop = 0, limit = 100, start = 0 }) {
  return Apis.instance()
    .history_api()
    .exec('get_relative_account_history', [id, stop, limit, start]);
}

export const getMarketHistory = async (
  baseId,
  quoteId,
  limit = 100,
  startDate = null,
  endDate = null
) => {
  return await Apis.instance()
    .history_api()
    .exec('get_market_history', [baseId, quoteId, limit, startDate, endDate]);
};
