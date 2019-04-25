import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'qrcode.react';

import AssetDropdown from 'components/AssetDropdown';
import Warning from 'src/elements/Warning';
import AssetAmount from 'src/models/AssetAmount';
import localizer from 'utils/localizer';
import Modal from 'elements/Modal';
import Copy from 'elements/Copy';
import Spinner from 'elements/Spinner';
import withRouter from 'hocs/withRouter';
import Translate from 'elements/Translate';
import PageHeader from 'elements/PageHeader';
import AmountLabel from 'elements/AmountLabel';

import URL from 'enums/url';
import cn from 'utils/bem';
import { isProd } from 'utils/env';
import { tokenizeActions, tokenizeSelectors } from 'ducks/tokenize';
import { accountSelectors } from 'ducks/account';
import { syncQueryParams } from 'utils/syncQueryParams';

import TokenizeIcon from 'icons/tokenize.svg';

import { propTypes } from './props';
import './style.styl';

const b = cn('tokenize');

class Tokenize extends React.Component {
  static propTypes = propTypes;

  state = {
    asset: null
  };

  static getDerivedStateFromProps(props, state) {
    const { assets } = props;
    const shouldUpdateState =
      !assets.includes(state.asset) || !assets.includes(state.feeAsset);

    if (!shouldUpdateState) {
      return null;
    }

    if (props.queryParams.asset) {
      const defaultAsset = assets.find(
        asset => asset.asset === props.queryParams.asset
      );

      return {
        asset: defaultAsset
      };
    }
  }

  componentDidMount() {
    const { asset } = this.state;
    const { accountPlainId, tokenizeActions } = this.props;
    tokenizeActions.requestAddress({
      asset: asset.asset,
      accountId: accountPlainId
    });
  }

  onClose = () => {
    const { routerActions, location } = this.props;

    if (!location || !location.from) {
      routerActions.navigate({ pathname: URL.ROOT });
      return;
    }

    routerActions.back();
  };

  onChange = asset => {
    const { accountPlainId, tokenizeActions } = this.props;

    if (this.state.asset.id !== asset.id) {
      this.setState({
        asset
      });

      tokenizeActions.requestAddress({
        asset: asset.asset,
        accountId: accountPlainId
      });
    }
  };

  render() {
    const { assets, addressRequest } = this.props;
    const { asset } = this.state;

    const minValue = AssetAmount.parse('1', asset.precision);
    const assetName = asset.displayName;

    return (
      <Modal
        className={b()}
        HeaderContent={() => (
          <PageHeader Icon={TokenizeIcon} titlePath="page.tokenize.label" />
        )}
        isOpen
        onClose={this.onClose}
      >
        <div className={b('content')} data-testid="tokenize-form">
          <div className={b('row')}>
            <div className={b('label-wrapper')}>
              <div className={b('label')}>
                {localizer.getValue('page.tokenize.coinLabel')}
              </div>
            </div>

            <div className={b('field')}>
              <AssetDropdown
                assets={assets}
                onChange={syncQueryParams('asset', 'asset', this.onChange)}
                selectedAsset={asset}
              />
              <AmountLabel>
                <Translate
                  path="page.tokenize.minAmountWarning"
                  params={{
                    minValue,
                    assetName
                  }}
                />
              </AmountLabel>
            </div>
          </div>
          <div className={b('address-wrapper')}>
            <div className={b('info')}>
              <div className={b('address-content')}>
                <section className={b('address-text')}>
                  <div className={b('address-label')}>
                    <Translate
                      path="page.tokenize.addressLabel"
                      params={{ assetName: asset.displayName }}
                    />
                  </div>
                  {addressRequest.isFetching ? (
                    <Spinner />
                  ) : (
                    <React.Fragment>
                      <div className={b('address-value')}>
                        {addressRequest.data}
                      </div>
                      <Copy
                        className={b('address-copy')}
                        value={addressRequest.data}
                      />
                    </React.Fragment>
                  )}
                </section>
                {!addressRequest.isFetching &&
                  addressRequest.data && (
                    <QRCode
                      data-testid="qr-code"
                      className={b('address-code')}
                      value={addressRequest.data}
                      renderAs="svg"
                    />
                  )}
              </div>
            </div>
          </div>
          <Warning className={b('warning')}>
            <Translate
              path="page.tokenize.warning"
              className={b('general-warning')}
            />
            {!isProd() && <Translate path="page.tokenize.testnetWarning" />}
          </Warning>
        </div>
      </Modal>
    );
  }
}

function mapStateToProp(state) {
  return {
    accountPlainId: accountSelectors.accountPlainId(state),
    addressRequest: tokenizeSelectors.getAddressRequest(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenizeActions: {
      requestAddress: bindActionCreators(
        tokenizeActions.requestAddress,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(
  withRouter(Tokenize)
);
