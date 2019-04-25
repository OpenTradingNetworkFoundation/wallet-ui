import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { curry, debounce } from 'lodash';

import PaddedAmount from 'elements/PaddedAmount';
import EmptyOrderBook from 'pages/Exchange/Pro/Page/OrderBook/Empty';

import { DISPLAY_CURRENCY } from 'pages/Exchange/Pro/Page/constants/displayCurrency';
import ORDER_BOOK_TYPE from 'pages/Exchange/Pro/Page/constants/orderBookType';

import { propTypes } from './props';
import {
  Container,
  Item,
  Amount,
  BottomBorder,
  List,
  TotalBar
} from './styled';

const PRICE_PRECISION = 6;

const UPDATE_DELAY = 300;

const getPercentage = float =>
  float * 100 > 100 ? 100 : (float * 100).toFixed(2);

class OrderBookList extends React.Component {
  static propTypes = propTypes;

  state = {
    visibleItems: {},
    maxTotal: 0
  };

  shouldComponentUpdate(props, state) {
    return (
      props.orders !== this.props.orders ||
      props.type !== this.props.type ||
      state.maxTotal !== this.state.maxTotal ||
      props.totalCurrency !== this.props.totalCurrency
    );
  }

  onVisibleChange = curry((total, isVisible) => {
    this.setState(
      state => ({
        visibleItems: {
          ...state.visibleItems,
          [total]: isVisible
        }
      }),
      this.updateMaxTotal
    );
  });

  updateMaxTotal = debounce(() => {
    const visibleItems = this.state.visibleItems;

    const maxTotal = Object.keys(visibleItems)
      .map(total => ({ total, visible: visibleItems[total] }))
      .filter(item => item.visible)
      .reduce((res, item) => (+item.total > res ? +item.total : res), 0);

    this.setState({ maxTotal });
  }, UPDATE_DELAY);

  render() {
    const { orders, type, selectOrder, totalCurrency } = this.props;
    const maxTotal = this.state.maxTotal;

    const isAsk = type === ORDER_BOOK_TYPE.ASKS;

    return (
      <Container>
        {orders && orders.length ? (
          <React.Fragment>
            <List>
              {orders.map(order => (
                <VisibilitySensor
                  key={order.price}
                  onChange={this.onVisibleChange(order.base)}
                  offset={{ bottom: 42 }}
                >
                  <Item isAsk={isAsk} onClick={() => selectOrder(order)}>
                    <Amount align={isAsk ? 'right' : 'left'}>
                      {totalCurrency === DISPLAY_CURRENCY.BASE
                        ? order.baseTotal
                        : order.quoteTotal}
                    </Amount>
                    <Amount middle align="center">
                      {order.quote}
                    </Amount>
                    <Amount
                      paddingRight={!isAsk && '12px'}
                      paddingLeft={isAsk && '12px'}
                      isAsk={isAsk}
                      align={isAsk ? 'left' : 'right'}
                    >
                      <PaddedAmount
                        value={order.price}
                        precision={PRICE_PRECISION}
                      />
                    </Amount>
                    <TotalBar
                      percentage={getPercentage(order.base / maxTotal)}
                      isAsk={isAsk}
                    />
                  </Item>
                </VisibilitySensor>
              ))}
            </List>
            <BottomBorder />
          </React.Fragment>
        ) : (
          <EmptyOrderBook type={type} />
        )}
      </Container>
    );
  }
}

export default OrderBookList;
