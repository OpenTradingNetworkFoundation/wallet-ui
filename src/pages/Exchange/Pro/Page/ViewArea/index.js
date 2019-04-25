import React from 'react';
import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';

import { ASSET } from 'enums/asset';
import { DISPLAY_TYPE } from 'pages/Exchange/Pro/Page/constants/viewAreaDisplayType';
import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';

import AssetAmount from 'src/models/AssetAmount';

import translate from 'services/translate';

import { balanceSelectors } from 'ducks/balance';
import { orderBookSelectors } from 'ducks/order-book';

import MarketSelector from 'pages/Exchange/Pro/Page/MarketSelector';
import ProDropdown from 'pages/Exchange/Pro/Page/Dropdown';
import OrderBook from 'pages/Exchange/Pro/Page/OrderBook/Container';
import LimitOrder from 'pages/Exchange/Pro/Page/LimitOrder';
import TradingHistory from 'pages/Exchange/Pro/Page/TradingHistory';
import TradingViewWrapper from 'pages/Exchange/Pro/Page/TradingViewWrapper';

import {
  View,
  LimitOrderArea,
  Main,
  MainViewArea,
  OrderBookPanel,
  WidthContainer,
  AveragePrice,
  OrderBookArea
} from './styled';
import { propTypes } from './props';

const defaultBase = ASSET.OTN;
const defaultQuote = ASSET.BTC;
const initialOrder = {
  amount: '1',
  total: '',
  price: ''
};

const findAsset = memoizeOne((balances, asset) =>
  balances.find(balance => balance.asset === asset)
);

class ViewArea extends React.PureComponent {
  static propTypes = propTypes;

  state = {
    dropdownOptions: [
      {
        id: translate('page.exchangePro.orderBook'),
        type: DISPLAY_TYPE.ORDER_BOOK
      },
      {
        id: translate('page.exchangePro.tradingHistory'),
        type: DISPLAY_TYPE.TRADING_HISTORY
      },
      {
        id: translate('page.exchangePro.chart'),
        type: DISPLAY_TYPE.CHART
      }
    ],
    panelContent: {
      id: translate('page.exchangePro.orderBook'),
      type: DISPLAY_TYPE.ORDER_BOOK
    },
    limitOrderContent: {
      id: translate('page.exchangePro.limitOrder.label')
    },
    limitOrderOptions: [{ id: translate('page.exchangePro.limitOrder.label') }],
    currentlySelectedItem: {
      base: defaultBase,
      quote: defaultQuote
    },
    currentOrder: initialOrder
  };

  handleItemSelect = ({ base, quote }) => {
    this.setState({
      currentlySelectedItem: {
        base,
        quote
      },
      currentOrder: initialOrder
    });
  };

  handleSelectOrder = currentOrderType => order => {
    const { balances } = this.props;
    const { currentlySelectedItem } = this.state;

    const { baseTotal, quoteTotal, price } = order;
    const baseAsset = findAsset(balances.all, currentlySelectedItem.base);
    const quoteAsset = findAsset(balances.all, currentlySelectedItem.quote);

    this.setState({
      currentOrder:
        currentOrderType === ORDER_TYPE.SELL
          ? {
              amount: baseTotal,
              price: price,
              total: AssetAmount.multiply(
                baseTotal,
                price,
                quoteAsset.precision
              )
            }
          : {
              amount: AssetAmount.divide(
                quoteTotal,
                price,
                baseAsset.precision
              ),
              price: price,
              total: quoteTotal
            }
    });
  };

  updateCurrentOrder = currentOrder => {
    this.setState({ currentOrder });
  };

  onContentChange = newValue => {
    this.setState({
      panelContent: newValue
    });
  };

  render() {
    const { balances, averagePrice } = this.props;
    const { currentlySelectedItem } = this.state;

    const baseAsset = findAsset(balances.all, currentlySelectedItem.base);
    const quoteAsset = findAsset(balances.all, currentlySelectedItem.quote);

    return (
      <View>
        <MarketSelector
          currentlySelectedMarket={currentlySelectedItem}
          handleItemSelect={this.handleItemSelect}
          supportedAssets={Object.values(ASSET)}
        />
        <Main>
          <MainViewArea>
            <OrderBookPanel>
              <WidthContainer width="172px">
                <ProDropdown
                  onChange={this.onContentChange}
                  value={this.state.panelContent}
                  options={this.state.dropdownOptions}
                />
              </WidthContainer>
              {this.state.panelContent.type === DISPLAY_TYPE.ORDER_BOOK && (
                <AveragePrice>{averagePrice}</AveragePrice>
              )}
            </OrderBookPanel>
            <OrderBookArea>
              {this.state.panelContent.type === DISPLAY_TYPE.ORDER_BOOK ? (
                <OrderBook
                  currentlySelectedItem={currentlySelectedItem}
                  balances={balances}
                  selectOrder={this.handleSelectOrder}
                />
              ) : this.state.panelContent.type ===
              DISPLAY_TYPE.TRADING_HISTORY ? (
                <TradingHistory base={baseAsset} quote={quoteAsset} />
              ) : (
                <TradingViewWrapper
                  base={baseAsset.name}
                  quote={quoteAsset.name}
                />
              )}
            </OrderBookArea>
          </MainViewArea>
          <LimitOrderArea>
            <ProDropdown
              value={this.state.limitOrderContent}
              options={this.state.limitOrderOptions}
            />
            <LimitOrder
              base={baseAsset}
              quote={quoteAsset}
              currentOrder={this.state.currentOrder}
              updateCurrentOrder={this.updateCurrentOrder}
            />
          </LimitOrderArea>
        </Main>
      </View>
    );
  }
}

export default connect(state => ({
  balances: {
    available: balanceSelectors.notEmpty(state),
    all: balanceSelectors.balances(state)
  },
  averagePrice: orderBookSelectors.averagePrice(state)
}))(ViewArea);
