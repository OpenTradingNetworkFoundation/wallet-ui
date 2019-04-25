import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cn from 'utils/bem';
import Modal from 'elements/Modal';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import QueryParams from 'components/QueryParams';
import withRouter from 'hocs/withRouter';
import PageHeader from 'elements/PageHeader';

import URL from 'enums/url';
import { ASSET } from 'enums/asset';
import { SERVICE, ERROR } from 'enums/serviceStatus';

import { balanceSelectors } from 'ducks/balance';
import { gatewayActions, gatewaySelectors } from 'ducks/gateway';
import { gatewayFeeActions } from 'ducks/fee/gateway';
import { detokenizeFundsActions } from 'ducks/detokenize-funds';
import ErrorBoundary from 'components/ErrorBoundary';
import Confirmation from 'pages/Detokenize/Confirmation';

import localizer from 'utils/localizer';

import DetokenizeIcon from 'icons/detokenize.svg';

import Form from '../Form/Container';

import { propTypes } from './props';

const b = cn('detokenize-page');
const STEP = {
  FORM: 'form',
  CONFIRM: 'confirm'
};

class DetokenizePage extends React.Component {
  static propTypes = propTypes;

  state = {
    step: STEP.FORM,
    defaultState: true,
    formState: {
      asset: null,
      feeAsset: null,
      amount: '',
      address: ''
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { availableAssets, feeAssets } = props;
    // TODO this should be refactored. Form component should process this.

    if (!state.defaultState) {
      return null;
    }

    return {
      defaultState: false,
      formState: {
        ...state.formState,
        asset: availableAssets[0],
        feeAsset: feeAssets[0]
      }
    };
  }

  componentDidMount() {
    const { gatewayActions, feeActions } = this.props;
    gatewayActions.getInfo();
    feeActions.loadGatewayFee();
  }

  onFormSubmit = (fields, detokenizationParams, { amount, feeAmount }) => {
    this.setState({
      step: STEP.CONFIRM,
      formState: {
        ...fields
      },
      detokenizationParams,
      amount,
      feeAmount
    });
  };

  onConfirmSend = () => {
    const { detokenizeActions, routerActions, location } = this.props;

    const { detokenizationParams } = this.state;
    detokenizeActions.detokenize(detokenizationParams);
    routerActions.navigate({ pathname: URL.WALLET, from: location });
  };

  onClose = () => {
    const { routerActions, location } = this.props;
    routerActions.navigate({ pathname: URL.WALLET, from: location });
  };

  onBack = () =>
    this.setState({
      step: STEP.FORM
    });

  render() {
    const { formState, amount, feeAmount } = this.state;

    const { asset, feeAsset, address } = formState;
    const {
      availableAssets,
      feeAssets,
      hasBalances,
      balanceNames
    } = this.props;

    return (
      <ErrorBoundary required={SERVICE.GATEWAY} type={ERROR[SERVICE.GATEWAY]}>
        <Modal
          className={b()}
          HeaderContent={
            hasBalances
              ? () => (
                  <PageHeader
                    Icon={DetokenizeIcon}
                    titlePath="page.detokenize.label"
                  />
                )
              : null
          }
          isOpen
          onClose={this.onClose}
        >
          {hasBalances ? (
            <QueryParams
              params={{
                asset: {
                  values: balanceNames,
                  default: ASSET.OTN
                }
              }}
              render={queryParams => {
                if (this.state.step === STEP.FORM) {
                  return (
                    <Form
                      onSubmit={this.onFormSubmit}
                      defaultFormState={formState}
                      availableAssets={availableAssets}
                      feeAssets={feeAssets}
                      queryParams={queryParams}
                    />
                  );
                } else {
                  return (
                    <Confirmation
                      onBack={this.onBack}
                      onConfirm={this.onConfirmSend}
                      asset={asset}
                      feeAsset={feeAsset}
                      feeAmount={feeAmount}
                      address={address}
                      amount={amount}
                    />
                  );
                }
              }}
            />
          ) : (
            <EmptyPlaceholder
              title={localizer.getValue('page.detokenize.empty.title')}
              description={localizer.getValue(
                'page.detokenize.empty.description'
              )}
            />
          )}
        </Modal>
      </ErrorBoundary>
    );
  }
}

function mapStateToProp(state) {
  return {
    availableAssets: gatewaySelectors.supportedAssets(
      state,
      balanceSelectors.notEmpty
    ),
    balanceNames: balanceSelectors.balanceNames(state),
    feeAssets: balanceSelectors.notEmpty(state),
    hasBalances: balanceSelectors.hasBalances(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gatewayActions: {
      getInfo: bindActionCreators(gatewayActions.getInfo, dispatch)
    },
    feeActions: {
      loadGatewayFee: bindActionCreators(gatewayFeeActions.loadFees, dispatch)
    },
    detokenizeActions: {
      detokenize: bindActionCreators(
        detokenizeFundsActions.detokenizeFunds,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(
  withRouter(DetokenizePage)
);
