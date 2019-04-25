import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import { balanceSelectors } from 'ducks/balance';

import { detokenizeFeeActions } from 'ducks/fee/detokenize';
import { gatewaySelectors } from 'ducks/gateway';
import { gatewayFeeSelectors } from 'ducks/fee/gateway';
import {
  addressValidationActions,
  addressValidationSelectors
} from 'ducks/address-validation';

import AssetAmount from 'src/models/AssetAmount';

import Component from 'pages/Detokenize/Form/Component';
import DetokenizationDisabled from 'components/DetokenizationDisabled';

import { propTypes } from './props';
import validate from './validate';

const DEFAULT_AMOUNT = 0;
const OPERATION_TYPE = 'withdrawal';
const UPDATE_FEE_DELAY = 700;
const UPDATE_ADDRESS_DELAY = 700;

class DetokenizeForm extends React.Component {
  static propTypes = propTypes;

  state = {
    isDefault: true,
    asset: null,
    feeAsset: null,
    amount: '',
    address: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { defaultFormState, balances } = props;

    const defaultAsset = balances.find(
      asset => asset.displayName === props.queryParams.asset
    );

    if (state.isDefault) {
      return {
        ...defaultFormState,
        asset: defaultAsset,
        isDefault: false
      };
    } else if (state.asset) {
      return null;
    }
  }

  componentDidMount() {
    this.updateFee();
  }

  updateFee = () => {
    const { feeAction } = this.props;
    const formState = this.formState;
    const values = formState.fields;

    const hasError = Boolean(formState.validation.amount);

    feeAction.loadFee({
      ...this.getApiParams(),
      amount: hasError ? DEFAULT_AMOUNT : values.amount
    });
  };

  updateFeeDebounce = debounce(this.updateFee, UPDATE_FEE_DELAY);

  getApiParams = () => {
    const { gatewayId } = this.props;
    const formState = this.formState;
    const values = formState.fields;

    return {
      amount: values.amount,
      recipientId: gatewayId,
      asset: values.asset,
      feeAsset: values.feeAsset,
      message: {
        type: OPERATION_TYPE,
        address: values.address
      }
    };
  };

  onFieldChange = (key, value) => {
    this.setState({ ...this.state, [key]: value });
  };

  onAssetChange = this.onFieldChange.bind(this, 'asset');

  onAmountChange = this.onFieldChange.bind(this, 'amount');

  onFeeAssetChange = feeAsset => {
    this.setState({ ...this.state, feeAsset }, this.updateFee);
  };

  onAddressChange = address => {
    this.validateAddress(address);
    this.setState({ ...this.state, address }, this.updateFeeDebounce);
  };

  validateAddress = address => {
    const { addressValidationActions } = this.props;
    const { asset: { name } } = this.state;
    if (name && address) {
      addressValidationActions.requestValidate({ address, asset: name });
    }
  };

  validateAddressDebounce = debounce(
    this.validateAddress,
    UPDATE_ADDRESS_DELAY
  );

  onSubmit = () => {
    const { onSubmit, fee } = this.props;
    const params = this.getApiParams();
    const { asset, amount, feeAsset } = params;
    const { fields } = this.formState;
    const finalAmount = Number(AssetAmount.normalize(amount, asset.precision));

    onSubmit(fields, params, {
      amount: AssetAmount.parse(finalAmount, asset.precision),
      feeAmount: AssetAmount.parse(fee.feeAmount, feeAsset.precision)
    });
  };

  get formState() {
    const fields = { ...this.state };
    const { fee, gatewayFee, addressValidation } = this.props;

    const externalFee = gatewayFee[fields.asset.id];
    const maxAmount =
      fields.asset.id === fields.feeAsset.id && Boolean(fee.feeAmount)
        ? fields.asset.amount - fee.feeAmount
        : fields.asset.amount;

    const validation = validate(fields, {
      maxAmount,
      externalFee,
      isAddressValid: addressValidation.valid
    });

    const hasAmountError = Boolean(validation.amount);

    const meta = {
      maxAmount: AssetAmount.parse(maxAmount, fields.asset.precision),
      fee: {
        showDetails: !hasAmountError && Boolean(fee.feeAmount),
        showPercentages:
          !hasAmountError && fields.asset.id === fields.feeAsset.id
      },
      externalFee,
      buttonDisabled: validation.invalid || fee.isLoading
    };

    return { fields, meta, validation };
  }

  render() {
    const { availableAssets, feeAssets, fee, supportedAssetsById } = this.props;
    const { fields, meta, validation } = this.formState;

    const isAssetSupportedByGateway = supportedAssetsById[fields.asset.id];

    return isAssetSupportedByGateway ? (
      <Component
        validation={validation}
        meta={meta}
        fields={fields}
        data={{ availableAssets, feeAssets, fee }}
        onAssetChange={this.onAssetChange}
        onAmountChange={this.onAmountChange}
        onAddressChange={this.onAddressChange}
        onFeeAssetChange={this.onFeeAssetChange}
        onSubmit={this.onSubmit}
      />
    ) : (
      <DetokenizationDisabled />
    );
  }
}

function mapStateToProp(state) {
  return {
    fee: state.detokenizeFee,
    gatewayId: gatewaySelectors.gatewayId(state),
    gatewayFee: gatewayFeeSelectors.fee(state),
    balances: balanceSelectors.balances(state),
    addressValidation: addressValidationSelectors.addressValidation(state),
    supportedAssetsById: gatewaySelectors.availableAssetsById(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    feeAction: {
      loadFee: bindActionCreators(detokenizeFeeActions.loadFee, dispatch)
    },
    addressValidationActions: {
      requestValidate: bindActionCreators(
        addressValidationActions.requestValidate,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(DetokenizeForm);
