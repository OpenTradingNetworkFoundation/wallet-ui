import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ChainStore } from 'bitsharesjs';
import { curry } from 'ramda';

import { exchangeFundsActions } from 'ducks/exchange-funds';
import { exchangeFeeActions } from 'ducks/fee/exchange';
import { balanceActions } from 'ducks/balance';

import { calculateDisplayPercentage } from 'utils/percentage';
import { calculateExpiration } from 'utils/expiration';
import { EXPIRATION } from 'enums/expiration';
import translate from 'services/translate';

import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';
import InputGroup from 'pages/Exchange/Pro/Page/InputGroup';
import Translate from 'elements/Translate';
import Tooltip from 'elements/Tooltip';

import WalletOutline from 'icons/wallet-outline.svg';
import FeePercentageIcon from 'icons/fee-percentage.svg';

import AssetAmount from 'src/models/AssetAmount';

import { sellValidate, buyValidate } from './validate';

import { propTypes } from './props';

import {
  LimitOrderForm,
  OrderButton,
  Balance,
  Text,
  Balances,
  Icon,
  Fee,
  ErrorMessage
} from './styled';

import './styles.styl';

const calculateAmountChange = curry(({ currentOrder, quote }, amount) => {
  return {
    ...currentOrder,
    amount,
    total:
      currentOrder.price && currentOrder.price > 0
        ? AssetAmount.multiply(amount, currentOrder.price, quote.precision)
        : currentOrder.total
  };
});

const calculateTotalChange = curry(({ currentOrder, base }, total) => {
  return {
    ...currentOrder,
    total,
    amount:
      currentOrder.price && currentOrder.price > 0
        ? AssetAmount.divide(total, currentOrder.price, base.precision)
        : currentOrder.amount
  };
});

const calculatePriceChange = curry(({ currentOrder, quote }, price) => {
  return {
    ...currentOrder,
    price,
    total: currentOrder.amount
      ? AssetAmount.multiply(price, currentOrder.amount, quote.precision)
      : currentOrder.total
  };
});

const resetCurrentOrder = () => ({ amount: 1, price: '', total: '' });

class LimitOrder extends React.PureComponent {
  static propTypes = propTypes;

  componentDidMount() {
    this.loadFee();
    ChainStore.subscribe(this.props.balanceActions.loadBalance);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.base.id !== this.props.base.id) {
      this.loadFee();
    }
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.props.balanceActions.loadBalance);
  }

  loadFee = () => {
    const { base, quote } = this.props;

    this.props.exchangeActions.loadFee({
      from: { assetId: base.id, amount: 0 },
      to: { assetId: quote.id, amount: 0 },
      feeAssetId: base.id
    });
  };

  handlePriceChange = price => {
    this.props.updateCurrentOrder(calculatePriceChange(this.props, price));
  };

  handleAmountChange = amount => {
    this.props.updateCurrentOrder(calculateAmountChange(this.props, amount));
  };

  handleTotalChange = total => {
    this.props.updateCurrentOrder(calculateTotalChange(this.props, total));
  };

  submitOrder = orderType => () => {
    const { base, quote } = this.props;

    const orderQuote = {
      amount: AssetAmount.normalize(
        '' + this.props.currentOrder.total,
        quote.precision
      ),
      assetId: quote.id
    };

    const orderBase = {
      amount: AssetAmount.normalize(
        '' + this.props.currentOrder.amount,
        base.precision
      ),
      assetId: base.id
    };

    const from = orderType === ORDER_TYPE.SELL ? orderBase : orderQuote;

    const to = orderType === ORDER_TYPE.SELL ? orderQuote : orderBase;

    this.props.exchangeActions.placeOrder({
      to: to,
      from: from,
      feeAssetId: base.id,
      fillOrKill: false,
      expiration: calculateExpiration(EXPIRATION.YEAR)
    });

    this.props.updateCurrentOrder(resetCurrentOrder());
  };

  submitBuyOrder = this.submitOrder(ORDER_TYPE.BUY);
  submitSellOrder = this.submitOrder(ORDER_TYPE.SELL);

  render() {
    const { base, quote, fee } = this.props;

    const sell = sellValidate({
      amount: '' + this.props.currentOrder.amount,
      asset: base,
      price: '' + this.props.currentOrder.price,
      maxAmount: base.amount - fee > 0 ? base.amount - fee : 0
    });

    const buy = buyValidate({
      total: '' + this.props.currentOrder.total,
      asset: quote,
      price: '' + this.props.currentOrder.price,
      amount: '' + this.props.currentOrder.amount,
      maxAmount: quote.amount
    });

    return (
      <LimitOrderForm>
        <InputGroup
          id="price"
          label={translate('page.exchangePro.limitOrder.priceLabel')}
          placeholder={translate('page.exchangePro.limitOrder.priceLabel')}
          value={this.props.currentOrder.price}
          onChange={this.handlePriceChange}
          asset={quote.asset}
        />

        <InputGroup
          id="amount"
          label={translate('page.exchangePro.limitOrder.amountLabel')}
          placeholder={translate('page.exchangePro.limitOrder.amountLabel')}
          value={this.props.currentOrder.amount}
          onChange={this.handleAmountChange}
          asset={base.asset}
          precision={base.precision}
        />

        <InputGroup
          id="total"
          label={translate('page.exchangePro.limitOrder.totalLabel')}
          placeholder={translate('page.exchangePro.limitOrder.totalLabel')}
          value={this.props.currentOrder.total}
          onChange={this.handleTotalChange}
          asset={quote.asset}
          precision={quote.precision}
        />

        <Balances>
          <Balance>
            <WalletOutline />
            <Text>
              {AssetAmount.parse(base.amount, base.precision)} {base.asset}
            </Text>
          </Balance>
          <Balance>
            <WalletOutline />
            <Text>
              {AssetAmount.parse(quote.amount, quote.precision)} {quote.asset}
            </Text>
          </Balance>
        </Balances>

        <Tooltip
          className={'tooltip-container'}
          contentClassName={'tooltip'}
          useContext
          mods={['dark']}
          disabled={!buy.invalid}
          renderTooltip={() => (
            <OrderButton
              buy
              type="button"
              onClick={() => this.submitBuyOrder()}
              disabled={buy.invalid}
            >
              <Translate path="page.exchangePro.limitOrder.buy" />
            </OrderButton>
          )}
          renderTitle={() => <ErrorMessage>{buy.amount}</ErrorMessage>}
        />
        <Tooltip
          className={'tooltip-container'}
          contentClassName={'tooltip'}
          useContext
          mods={['dark']}
          disabled={!sell.invalid}
          distance={5}
          renderTooltip={() => (
            <OrderButton
              type="button"
              onClick={() => this.submitSellOrder()}
              disabled={sell.invalid}
            >
              <Translate path="page.exchangePro.limitOrder.sell" />
            </OrderButton>
          )}
          renderTitle={() => <ErrorMessage>{sell.amount}</ErrorMessage>}
        />

        <Fee>
          <Icon>
            <FeePercentageIcon />
          </Icon>
          <Text>
            <Translate path="page.exchangePro.limitOrder.fee" />:{' '}
            {calculateDisplayPercentage(
              AssetAmount.parse(fee, base.precision) /
                this.props.currentOrder.amount
            )}%
          </Text>
        </Fee>
      </LimitOrderForm>
    );
  }
}

export default connect(
  state => ({
    fee: state.exchangeFee.feeAmount
  }),
  dispatch => ({
    exchangeActions: {
      placeOrder: bindActionCreators(
        exchangeFundsActions.exchangeFunds,
        dispatch
      ),
      loadFee: bindActionCreators(exchangeFeeActions.loadFee, dispatch)
    },
    balanceActions: {
      loadBalance: bindActionCreators(balanceActions.loadBalance, dispatch)
    }
  })
)(LimitOrder);
