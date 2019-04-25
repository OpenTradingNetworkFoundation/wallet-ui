import React from 'react';
import { ChainStore } from 'bitsharesjs';
import { List, AutoSizer } from 'react-virtualized';
import { map, reduce, contains, indexOf, propOr } from 'ramda';

import { getTradeHistory } from 'api/marketApi';
import { formatTrade, filterOdd, tradeReducer } from 'helpers/marketApiHelpers';
import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';

import withCallIfMounted from 'hocs/withCallIfMounted';
import EmptyOrderBook from 'pages/Exchange/Pro/Page/OrderBook/Empty';
import Translate from 'elements/Translate';

import {
  Trade,
  Text,
  Amount,
  TradeHistory,
  Header,
  TradeHistoryContainer,
  TradeHistoryTable
} from './styled';
import { propTypes } from './props';

/**
 * What's actually going on is that we have a List of opacity indeces
 * matching array of
 */
const opacity = (predicate, firstListIndex, secondListIndex) =>
  predicate
    ? propOr(1, firstListIndex, [0.25, 0.15, 0.05])
    : propOr(1, secondListIndex, [0.25, 0.15, 0.05]);

const backgroundColor = (first, second) =>
  first ? '50, 171, 81' : second ? '231, 90, 90' : '43, 48, 73';

class TradingHistory extends React.PureComponent {
  static propTypes = propTypes;

  state = {
    tradeHistory: {
      trades: [],
      sell: [-Infinity, -Infinity, -Infinity],
      buy: [-Infinity, -Infinity, -Infinity]
    }
  };

  fetchTradeHistory = () => {
    const { base, quote } = this.props;

    return getTradeHistory(base, quote)
      .then(r => r.filter(filterOdd))
      .then(map(formatTrade(base, quote)))
      .then(
        reduce(tradeReducer, {
          trades: [],
          buy: [-Infinity, -Infinity, -Infinity],
          sell: [-Infinity, -Infinity, -Infinity]
        })
      )
      .then(tradeHistory =>
        this.props.callIfMounted(() =>
          this.setState({
            tradeHistory
          })
        )
      );
  };

  componentDidMount() {
    this.fetchTradeHistory();
    ChainStore.subscribe(this.fetchTradeHistory);
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.fetchTradeHistory);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.base.id !== this.props.base.id ||
      prevProps.quote.id !== this.props.quote.id
    ) {
      this.fetchTradeHistory();
    }
  }

  render() {
    const { trades, sell, buy } = this.state.tradeHistory;

    return (
      <TradeHistoryContainer>
        <Header>
          <Text>{this.props.base.asset}</Text>
          <Text>{this.props.quote.asset}</Text>
          <Text>
            <Translate path="page.exchangePro.headers.date" />
          </Text>
        </Header>
        <TradeHistoryTable>
          <AutoSizer>
            {({ width, height }) => (
              <List
                style={{ outline: 0 }}
                rowHeight={26}
                height={height}
                width={width}
                noRowsRenderer={() => (
                  <TradeHistory empty>
                    <EmptyOrderBook>
                      <Translate path="page.exchangePro.empty.tradingHistory" />
                    </EmptyOrderBook>
                  </TradeHistory>
                )}
                rowCount={trades.length}
                rowRenderer={({ index, key, style }) => {
                  const { value, amount, date, type } = trades[index];
                  const comparator = +value;
                  const comparatorIndex = indexOf(comparator);

                  return (
                    <Trade
                      key={key}
                      style={style}
                      opacity={opacity(
                        type === ORDER_TYPE.SELL,
                        comparatorIndex(sell),
                        comparatorIndex(buy)
                      )}
                      backgroundColor={backgroundColor(
                        type === ORDER_TYPE.BUY && contains(comparator, buy),
                        type === ORDER_TYPE.SELL && contains(comparator, sell)
                      )}
                    >
                      <Amount buy={type === ORDER_TYPE.BUY}>{value}</Amount>
                      <Text>{amount}</Text>
                      <Text>{date}</Text>
                    </Trade>
                  );
                }}
              />
            )}
          </AutoSizer>
        </TradeHistoryTable>
      </TradeHistoryContainer>
    );
  }
}

export default withCallIfMounted(TradingHistory);
