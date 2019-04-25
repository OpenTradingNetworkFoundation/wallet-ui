import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { bindActionCreators } from 'redux';

import AssetAmount from 'src/models/AssetAmount';
import { accountSelectors } from 'ducks/account';
import { balanceSelectors } from 'ducks/balance';
import { feeActions } from 'ducks/fee/send';
import { userLookUpActions, userLookUpSelectors } from 'ducks/user-look-up';

import Component from '../Component';

import { propTypes } from './props';
import validate from './validate';

const CHECK_USER_DELAY = 700;
const CHECK_FEE_DELAY = 700;
const DEFAULT_AMOUNT = 0;

class Container extends React.Component {
  static propTypes = propTypes;

  static getDerivedStateFromProps(props, state) {
    const { formState, balances, availableAssets } = props;

    if (!state.isDefault) {
      return null;
    }

    if (formState) {
      return {
        ...formState,
        isDefault: false
      };
    }

    const defaultAsset = balances.find(
      asset => asset.displayName === props.queryParams.asset
    );
    const defaultFeeAsset =
      defaultAsset.amount !== 0 ? defaultAsset : availableAssets[0];

    return {
      asset: defaultAsset,
      feeAsset: defaultFeeAsset,
      isDefault: false
    };
  }

  state = {
    isDefault: true,
    asset: null,
    amount: '',
    feeAsset: null,
    username: '',
    memo: ''
  };

  componentDidMount() {
    this.updateFee();
  }

  onFieldChange = (key, value) => {
    this.setState({ [key]: value });
  };

  onMemoChange = memo => {
    this.setState({ memo }, this.updateFeeWithMemo);
  };

  onAssetChange = this.onFieldChange.bind(this, 'asset');
  onAmountChange = this.onFieldChange.bind(this, 'amount');

  onFeeAssetChange = feeAsset => {
    this.setState({ feeAsset }, this.updateFee);
  };

  onUsernameChange = username => {
    this.validateUserName(username);
    this.updateFeeWithMemo();
    this.setState({ username });
  };

  validateUserName = debounce(username => {
    const { userLookUpActions } = this.props;
    if (username) {
      userLookUpActions.lookUp(username);
    }
  }, CHECK_USER_DELAY);

  onSubmit = () => {
    const { onSubmit, fee, userLookUp } = this.props;
    const { fields } = this.formState;

    onSubmit(
      {
        ...fields,
        memo: userLookUp.hasNotNullMemoKey ? fields.memo : ''
      },
      {
        feeAmount: AssetAmount.parse(fee.feeAmount, fields.feeAsset.precision)
      }
    );
  };

  updateFee = () => {
    const { feeAction } = this.props;
    const formState = this.formState;
    const values = formState.fields;

    const hasError = Boolean(formState.validation.amount);

    feeAction.loadFee({
      ...values,
      amount: hasError ? DEFAULT_AMOUNT : values.amount,
      username: formState.validation.username ? null : values.username
    });
  };

  updateFeeWithMemo = debounce(this.updateFee, CHECK_FEE_DELAY);

  get formState() {
    const { userLookUp, fee, accountName } = this.props;
    const fields = { ...this.state };
    const metaDisabled =
      userLookUp.exist &&
      !userLookUp.isLoading &&
      !userLookUp.hasNotNullMemoKey;

    const assetAmount = fields.asset.amount;
    const diff =
      assetAmount - fee.feeAmount > 0 ? assetAmount - fee.feeAmount : 0;

    let maxAmount =
      fields.asset.id === fields.feeAsset.id && Boolean(fee.feeAmount)
        ? diff
        : assetAmount;

    const validation = validate(fields, {
      maxAmount,
      isUserExist: userLookUp.exist,
      accountName
    });

    const hasAmountError = Boolean(validation.amount);

    let meta = {
      maxAmount: AssetAmount.parse(maxAmount, fields.asset.precision),
      fee: {
        showDetails: !hasAmountError && Boolean(fee.feeAmount),
        showPercentages:
          !hasAmountError && fields.asset.id === fields.feeAsset.id
      },
      buttonDisabled: userLookUp.isLoading || validation.invalid,
      metaDisabled
    };

    return { fields, validation, meta };
  }

  render() {
    const { fields, validation, meta } = this.formState;
    const { availableAssets, fee, userLookUp } = this.props;

    return (
      <Component
        fields={fields}
        validation={validation}
        meta={meta}
        data={{ availableAssets, fee, userLookUp }}
        onAssetChange={this.onAssetChange}
        onAmountChange={this.onAmountChange}
        onMemoChange={this.onMemoChange}
        onSubmit={this.onSubmit}
        onUsernameChange={this.onUsernameChange}
        onFeeAssetChange={this.onFeeAssetChange}
      />
    );
  }
}

function mapStateToProp(state) {
  return {
    balances: balanceSelectors.balances(state),
    availableAssets: balanceSelectors.notEmpty(state),
    fee: state.fee,
    userLookUp: userLookUpSelectors.userLookUp(state),
    accountName: accountSelectors.accountName(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    feeAction: {
      loadFee: bindActionCreators(feeActions.loadFee, dispatch)
    },
    userLookUpActions: {
      lookUp: bindActionCreators(userLookUpActions.lookUp, dispatch),
      update: bindActionCreators(userLookUpActions.update, dispatch)
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Container);
