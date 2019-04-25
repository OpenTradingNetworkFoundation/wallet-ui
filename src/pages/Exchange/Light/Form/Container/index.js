import React from 'react';
import { ChainStore } from 'bitsharesjs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { curry } from 'lodash';

import AssetAmount from 'src/models/AssetAmount';
import { FOCUSED_INPUT } from 'enums/focusedInput';

import { balanceSelectors } from 'ducks/balance';
import { exchangeFeeActions } from 'ducks/fee/exchange';
import { orderBookActions } from 'ducks/order-book';
import { ratesActions, ratesSelectors } from 'ducks/rates';

import Component from '../Component';

import validate from './validate';
import { propTypes } from './props';

const applyFieldName = curry((onClick, field, value) => onClick(field, value));

class ExchangeForm extends React.Component {
  static propTypes = propTypes;

  static getDerivedStateFromProps(props, state) {
    const { balances, queryParams, formState } = props;
    const { isDefault } = state;

    if (!isDefault) {
      return null;
    }

    if (formState) {
      return {
        ...formState,
        isDefault: false
      };
    }

    const fromAsset = balances.all.find(
      asset => asset.displayName === queryParams.asset
    );

    const updatedTo = balances.all.find(
      asset => asset.asset !== fromAsset.asset
    );

    return {
      fromAsset,
      toAsset: updatedTo,
      feeAsset: fromAsset,
      isDefault: false
    };
  }

  state = {
    feeAsset: null,
    toAmount: '',
    fromAmount: '',
    toAsset: null,
    fromAsset: null,
    isDefault: true
  };

  componentDidMount() {
    ChainStore.subscribe(this.getOrderBook);
    this.getOrderBook();
    this.getFee();
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.getOrderBook);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.priceMeta.price !== this.props.priceMeta.price) {
      if (
        this.state.focusedInput === FOCUSED_INPUT.FROM_AMOUNT &&
        this.state.fromAmount.length
      ) {
        this.onFromAmountChange(this.state.fromAmount, false);
      } else if (
        this.state.focusedInput === FOCUSED_INPUT.TO_AMOUNT &&
        this.state.toAmount.length
      ) {
        this.onToAmountChange(this.state.toAmount, false);
      }
    }
  }

  onAssetChange = (key, value) => {
    this.setState({ ...this.state, [key]: value }, this.getOrderBook);
  };

  onToAssetChange = applyFieldName(this.onAssetChange, 'toAsset');
  onFromAssetChange = applyFieldName(this.onAssetChange, 'fromAsset');

  onFeeAssetChange = feeAsset => {
    this.setState({ ...this.state, feeAsset }, this.getFee);
  };

  onToAmountChange = (toAmount, shouldUpdatePrice = true) => {
    const { fields } = this.formState;
    const { priceMeta } = this.props;

    const fromAmount = AssetAmount.round(
      toAmount * priceMeta.price,
      fields.toAsset.precision,
      Math.ceil
    );

    this.setState(
      {
        toAmount,
        fromAmount: isNaN(fromAmount) ? fields.fromAmount : fromAmount
      },
      () => shouldUpdatePrice && this.updatePrice()
    );
  };

  onMaxClick = inputId => {
    const { meta } = this.formState;
    this.onFocusedInput(inputId);
    this.onFromAmountChange(meta.fromMaxAmount);
  };

  onFromAmountChange = (fromAmount, shouldUpdatePrice = true) => {
    const { fields } = this.formState;
    const { priceMeta } = this.props;

    const toAmount = AssetAmount.round(
      fromAmount * (1 / priceMeta.price),
      fields.fromAsset.precision,
      Math.floor
    );

    this.setState(
      {
        fromAmount,
        toAmount: isNaN(toAmount) ? fields.toAmount : toAmount
      },
      () => shouldUpdatePrice && this.updatePrice()
    );
  };

  onExchangeAssets = () => {
    const { fields } = this.formState;
    this.setState(
      {
        fromAsset: fields.toAsset,
        toAsset: fields.fromAsset,
        toAmount: fields.fromAmount,
        fromAmount: fields.toAmount,
        focusedInput:
          this.state.focusedInput === FOCUSED_INPUT.FROM_AMOUNT
            ? FOCUSED_INPUT.TO_AMOUNT
            : FOCUSED_INPUT.FROM_AMOUNT
      },
      () => {
        this.getOrderBook();
        this.getFee();
      }
    );
  };

  onFormSubmit = () => {
    const { onSubmit } = this.props;

    onSubmit(this.formState.fields);
  };

  getOrderBook = () => {
    const { fromAsset, toAsset } = this.formState.fields;
    this.props.orderBookActions.requestLimitOrders({
      baseId: fromAsset.id,
      quoteId: toAsset.id,
      toAmount: this.state.toAmount,
      fromAmount: this.state.fromAmount,
      focusedInput: this.state.focusedInput
    });
  };

  updatePrice = () => {
    const { toAsset, toAmount } = this.formState.fields;
    const { priceAction } = this.props;
    priceAction.getPrice({
      toAmount,
      toAsset,
      fromAmount: this.state.fromAmount,
      focusedInput: this.state.focusedInput
    });
  };

  getFee = () => {
    const { exchangeAction: { loadFee }, getExchangeParams } = this.props;

    loadFee(getExchangeParams(this.formState.fields));
  };

  onFocusedInput = inputId => {
    this.setState(() => {
      return { focusedInput: inputId };
    });
  };

  get formState() {
    const fields = { ...this.state };
    const { fee, priceMeta: { availableAmount } } = this.props;

    const fromMaxAmount =
      fields.fromAsset.id === fields.feeAsset.id && Boolean(fee.feeAmount)
        ? fields.fromAsset.amount - fee.feeAmount
        : fields.fromAsset.amount;

    let meta = {
      fromMaxAmount: AssetAmount.parse(
        fromMaxAmount,
        fields.fromAsset.precision
      ),
      currentActiveInput: this.state.focusedInput
    };

    const validation = validate(fields, { fromMaxAmount, availableAmount });

    return { fields, validation, meta };
  }

  render() {
    const { priceMeta, fee, balances, exchangeScheme } = this.props;
    const { fields, validation, meta } = this.formState;

    return (
      <Component
        onToAssetChange={this.onToAssetChange}
        onFromAssetChange={this.onFromAssetChange}
        onFromAmountChange={this.onFromAmountChange}
        onMaxClick={this.onMaxClick}
        onToAmountChange={this.onToAmountChange}
        onFeeAssetChange={this.onFeeAssetChange}
        onExchangeAssets={this.onExchangeAssets}
        onFormSubmit={this.onFormSubmit}
        onFocusedInput={this.onFocusedInput}
        fields={fields}
        validation={validation}
        meta={meta}
        data={{
          priceMeta,
          fee,
          exchangeScheme,
          availableBalances: balances.available
        }}
      />
    );
  }
}

export default connect(
  state => ({
    balances: {
      available: balanceSelectors.notEmpty(state),
      all: balanceSelectors.balances(state)
    },
    exchangeScheme: balanceSelectors.exchangeScheme(state),
    fee: state.exchangeFee,
    priceMeta: ratesSelectors.rates(state)
  }),
  dispatch => ({
    exchangeAction: {
      loadFee: bindActionCreators(exchangeFeeActions.loadFee, dispatch)
    },
    priceAction: {
      getPrice: bindActionCreators(ratesActions.getPrice, dispatch)
    },
    orderBookActions: {
      requestLimitOrders: bindActionCreators(
        orderBookActions.limitOrdersRequest,
        dispatch
      )
    }
  })
)(ExchangeForm);
