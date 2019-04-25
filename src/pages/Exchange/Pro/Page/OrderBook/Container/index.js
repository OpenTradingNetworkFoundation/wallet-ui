import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { ChainStore } from 'bitsharesjs';
import memoizeOne from 'memoize-one';

import { orderBookActions, orderBookSelectors } from 'ducks/order-book';

import ORDER_BOOK_TYPE from 'pages/Exchange/Pro/Page/constants/orderBookType';
import { DIRECTION } from 'pages/Exchange/Pro/Page/constants/orderBookDirection';
import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';
import { DISPLAY_CURRENCY } from 'pages/Exchange/Pro/Page/constants/displayCurrency';

import OrderBookHeader from 'pages/Exchange/Pro/Page/OrderBook/Header';
import OrderBookList from 'pages/Exchange/Pro/Page/OrderBook/List';

import { OrderBookContainer } from './styled';
import { propTypes } from './props';

const getKey = (base, quote, tag) => tag + base + quote;
const findAsset = memoizeOne((balances, asset) =>
  balances.find(balance => balance.asset === asset)
);

class OrderBook extends React.Component {
  static propTypes = propTypes;

  state = {
    orderBookDirection: DIRECTION.NORMAL,
    totalCurrency: DISPLAY_CURRENCY.BASE
  };

  componentDidMount() {
    this.getOrderBook();
    ChainStore.subscribe(this.getOrderBook);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentlySelectedItem.base !==
        this.props.currentlySelectedItem.base ||
      prevProps.currentlySelectedItem.quote !==
        this.props.currentlySelectedItem.quote
    ) {
      this.getOrderBook();
    }
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.getOrderBook);
  }

  getOrderBook = () => {
    const { balances } = this.props;
    const { currentlySelectedItem: { base, quote } } = this.props;

    const baseId = findAsset(balances.all, base).id;
    const quoteId = findAsset(balances.all, quote).id;

    this.props.requestLimitOrders({ baseId, quoteId });
  };

  toggleTotalCurrency = () =>
    this.setState(state => ({
      totalCurrency:
        state.totalCurrency === DISPLAY_CURRENCY.BASE
          ? DISPLAY_CURRENCY.QUOTE
          : DISPLAY_CURRENCY.BASE
    }));

  render() {
    const { currentlySelectedItem: { base, quote }, selectOrder } = this.props;
    const { orderBook, orderBookAssets } = this.props;

    const orderBookBase = get(orderBookAssets, 'base.asset', base);
    const orderBookQuote = get(orderBookAssets, 'quote.asset', quote);

    return (
      <React.Fragment>
        {/* <OrderBookControls
                direction={this.state.orderBookDirection}
                toggleDirection={() =>
                  this.setState(state => ({
                    orderBookDirection:
                      state.orderBookDirection === DIRECTION.NORMAL
                        ? DIRECTION.REVERSE
                        : DIRECTION.NORMAL
                  }))
                }
              /> */}
        <OrderBookHeader
          base={base}
          quote={quote}
          totalCurrency={this.state.totalCurrency}
          toggleTotalCurrency={this.toggleTotalCurrency}
        />
        <OrderBookContainer
          reverse={this.state.orderBookDirection === DIRECTION.REVERSE}
        >
          <OrderBookList
            key={getKey(orderBookBase, orderBookQuote, ORDER_BOOK_TYPE.BIDS)}
            orders={orderBook && orderBook.bids}
            type={ORDER_BOOK_TYPE.BIDS}
            selectOrder={selectOrder(ORDER_TYPE.SELL)}
            totalCurrency={this.state.totalCurrency}
          />
          <OrderBookList
            key={getKey(orderBookBase, orderBookQuote, ORDER_BOOK_TYPE.ASKS)}
            orders={orderBook && orderBook.asks}
            type={ORDER_BOOK_TYPE.ASKS}
            selectOrder={selectOrder(ORDER_TYPE.BUY)}
            totalCurrency={this.state.totalCurrency}
          />
        </OrderBookContainer>
      </React.Fragment>
    );
  }
}
export default connect(
  state => ({
    orderBook: orderBookSelectors.limitOrders(state),
    orderBookAssets: orderBookSelectors.assets(state)
  }),
  dispatch => ({
    requestLimitOrders: bindActionCreators(
      orderBookActions.limitOrdersRequest,
      dispatch
    )
  })
)(OrderBook);
