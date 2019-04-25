import memoizeOne from 'memoize-one';
import { ChainStore } from 'bitsharesjs';

import store from 'src/store';
import { balanceSelectors } from 'ducks/balance';
import { getMarketHistory } from 'api/historyApi';
import AssetAmount from 'models/AssetAmount';

export const getResolutionsFromBuckets = buckets => {
  let resolutions = buckets
    .map(r => {
      const minute = r / 60;
      let day = minute / 60 / 24;
      let week = day / 7;

      if (minute < 1) {
        // below 1 minute we return Seconds
        return r + 'S';
      } else if (day < 1 && parseInt(minute, 10) === minute) {
        // below 1 day we return Minutes
        return minute.toString();
      } else if (week < 1) {
        // below 1 week we return Days
        if (day >= 1) {
          if (parseInt(day, 10) === day) {
            if (day === 1) return 'D';
            return day + 'D';
          }
        }
      } else {
        // we return weeks
        if (week >= 1) {
          if (parseInt(week, 10) === week) {
            return week + 'D';
          }
        }
      }

      return null;
    })
    .filter(a => !!a);

  return resolutions;
};

export const getBucketFromResolution = r => {
  if (r === 'D') return 24 * 60 * 60;

  if (r.indexOf('W') !== -1) {
    return parseInt(r.replace('D', ''), 10) * 7 * 24 * 60 * 60;
  } else if (r.indexOf('D') !== -1) {
    return parseInt(r.replace('D', ''), 10) * 24 * 60 * 60;
  } else if (r.indexOf('S') !== -1) {
    return parseInt(r.replace('S', ''), 10);
  } else {
    return parseInt(r, 10) * 60;
  }
};

const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatDate = date => date.toISOString().slice(0, -5);

const getMarketData = async (baseId, quoteId, bucketSize, bucketCount) => {
  let startDate = new Date();
  let startDate2 = new Date();
  let startDate3 = new Date();
  let endDate = new Date();

  startDate = new Date(startDate.getTime() - bucketSize * bucketCount * 1000);
  startDate2 = new Date(startDate2.getTime() - bucketSize * bucketCount * 2000);
  startDate3 = new Date(startDate3.getTime() - bucketSize * bucketCount * 3000);

  endDate.setDate(endDate.getDate() + 1);

  const data = await Promise.all([
    getMarketHistory(
      baseId,
      quoteId,
      bucketSize,
      formatDate(startDate),
      formatDate(endDate)
    ),
    getMarketHistory(
      baseId,
      quoteId,
      bucketSize,
      formatDate(startDate2),
      formatDate(startDate)
    ),
    getMarketHistory(
      baseId,
      quoteId,
      bucketSize,
      formatDate(startDate3),
      formatDate(startDate2)
    )
  ]);

  return data.flatten();
};

const getPrice = (quoteAmount, quoteAsset, baseAmount, baseAsset) => {
  return (
    AssetAmount.parse(quoteAmount, quoteAsset.precision) /
    AssetAmount.parse(baseAmount, baseAsset.precision)
  );
};

const formatData = (marketData, quote, base) => {
  let open, high, low, close, volume;

  return marketData.map(current => {
    if (!/Z$/.test(current.key.open)) {
      current.key.open += 'Z';
    }

    const date = new Date(current.key.open);

    if (quote.id === current.key.quote) {
      high = getPrice(current.high_base, base, current.high_quote, quote);
      low = getPrice(current.low_base, base, current.low_quote, quote);
      open = getPrice(current.open_base, base, current.open_quote, quote);
      close = getPrice(current.close_base, base, current.close_quote, quote);
      volume = AssetAmount.parse(current.quote_volume, quote.precision);
    } else {
      low = getPrice(current.high_quote, base, current.high_base, quote);
      high = getPrice(current.low_quote, base, current.low_base, quote);
      open = getPrice(current.open_quote, base, current.open_base, quote);
      close = getPrice(current.close_quote, base, current.close_base, quote);

      volume = AssetAmount.parse(current.base_volume, quote.precision);
    }

    function findMax(a, b) {
      if (a !== Infinity && b !== Infinity) {
        return Math.max(a, b);
      } else if (a === Infinity) {
        return b;
      } else {
        return a;
      }
    }

    function findMin(a, b) {
      if (a !== 0 && b !== 0) {
        return Math.min(a, b);
      } else if (a === 0) {
        return b;
      } else {
        return a;
      }
    }

    if (low === 0) {
      low = findMin(open, close);
    }

    if (isNaN(high) || high === Infinity) {
      high = findMax(open, close);
    }

    if (close === Infinity || close === 0) {
      close = open;
    }

    if (open === Infinity || open === 0) {
      open = close;
    }

    if (high > 1.3 * ((open + close) / 2)) {
      high = findMax(open, close);
    }

    if (low < 0.7 * ((open + close) / 2)) {
      low = findMin(open, close);
    }

    return { time: date.getTime(), open, high, low, close, volume };
  });
};

class SymbolInfo {
  constructor(options) {
    this.name = options.ticker;
    this.ticker = options.ticker;

    this.description = '';
    this.type = 'bitcoin';
    this.session = '24x7';
    this.timezone = getCurrentTimezone();
    this.data_status = 'streaming';
    this.supported_resolutions = options.resolutions;
    this.has_empty_bars = true;
    this.pricescale = Math.pow(10, options.baseAsset.precision);
    this.minmov = 1;

    this.baseAsset = options.baseAsset;
    this.quoteAsset = options.quoteAsset;

    this.has_intraday = this.supported_resolutions.reduce((supported, r) => {
      return supported || !isNaN(parseInt(r, 10));
    }, false);
    this.intraday_multipliers = this.supported_resolutions.filter(r => {
      return !isNaN(parseInt(r, 10));
    });

    this.has_seconds = this.supported_resolutions.reduce((supported, r) => {
      return supported || r.indexOf('S') !== -1;
    }, false);
    this.seconds_multipliers = this.supported_resolutions.filter(r => {
      return r.indexOf('S') !== -1;
    });

    this.has_daily = this.supported_resolutions.reduce((supported, r) => {
      return supported || r.indexOf('D') !== -1;
    }, false);

    this.has_daily = this.supported_resolutions.reduce((supported, r) => {
      return supported || r.indexOf('D') !== -1;
    }, false);
  }
}

const getAsset = memoizeOne((name, assets) =>
  assets.find(asset => asset.name === name)
);

class DataFeed {
  update(options) {
    for (let key in options) {
      switch (key) {
        case 'resolutions':
          this.supported_resolutions = getResolutionsFromBuckets(
            options.resolutions
          );
          break;

        case 'onMarketChange':
          this.clearSubs();
          ChainStore.subscribe(options[key]);
          this.onMarketChange = options[key];
          break;

        default:
          this[key] = options[key];
      }
    }
  }

  clearSubs() {
    if (this.onMarketChange) {
      ChainStore.unsubscribe(this.onMarketChange);
    }
  }

  onReady(callback) {
    setTimeout(() => {
      callback({
        exchanges: [{}],
        symbols_types: [],
        supported_resolutions: this.supported_resolutions,
        supports_marks: false,
        supports_search: false,
        supports_time: true
      });
    }, 0);
  }

  searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
    onResultReadyCallback([]);
  }

  resolveSymbol(symbolName, onSymbolResolvedCallback) {
    let [quote, base] = symbolName.split('_');

    const balances = balanceSelectors.balances(store.getState());
    const quoteAsset = getAsset(quote, balances);
    const baseAsset = getAsset(base, balances);

    setTimeout(
      () =>
        onSymbolResolvedCallback(
          new SymbolInfo({
            ticker: symbolName,
            quoteAsset,
            baseAsset,
            resolutions: this.supported_resolutions
          })
        ),
      0
    );
  }

  async getBars(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    from *= 1000;
    to *= 1000;
    const base = symbolInfo.baseAsset;
    const quote = symbolInfo.quoteAsset;

    if (this.interval !== resolution) {
      if (!firstDataRequest) {
        return;
      }

      this.interval = resolution;
    }

    const bucketSize = getBucketFromResolution(this.interval);

    let bars = await this._getHistory(base, quote, bucketSize);

    this.latestBar = bars[bars.length - 1];
    bars = bars.filter(a => {
      return a.time >= from && a.time <= to;
    });

    if (!bars.length) return onHistoryCallback(bars, { noData: true });

    onHistoryCallback(bars);
  }

  async _getHistory(base, quote, bucketSize) {
    const bucketCount = 2000;

    const data = await getMarketData(
      base.id,
      quote.id,
      bucketSize,
      bucketCount
    );

    return formatData(data, base, quote);
  }

  async subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    const base = symbolInfo.baseAsset;
    const quote = symbolInfo.quoteAsset;
    const bucketSize = getBucketFromResolution(this.interval);

    onResetCacheNeededCallback();

    let bars = await this._getHistory(base, quote, bucketSize);

    let newBars = bars.filter(a => {
      if (!this.latestBar) return true;
      return a.time > this.latestBar.time;
    });

    if (newBars.length) {
      newBars.forEach(bar => {
        onRealtimeCallback(bar);
      });
      this.latestBar = newBars[newBars.length - 1];
    } else {
      // Check if latest bar is different
      let didChange = false;
      for (let key in this.latestBar) {
        if (this.latestBar[key] !== bars[bars.length - 1][key]) {
          didChange = true;
        }
      }
      if (didChange) {
        onRealtimeCallback(bars[bars.length - 1]);
      }
    }
  }

  unsubscribeBars() {
    /*
    * This is ALWAYS called after subscribeBars for some reason, but
    * sometimes it executes BEFORE the subscribe call in subscribeBars and
    * sometimes AFTER. This causes the callback to be cleared and we stop
    * receiving updates from the MarketStore. Unless we find it causes bugs,
    * it's best to just not use this.
    */
  }

  calculateHistoryDepth(/*resolution, resolutionBack, intervalBack*/) {
    return undefined;
  }

  getServerTime(callback) {
    callback(new Date().getTime() / 1000);
  }
}

export { DataFeed };
