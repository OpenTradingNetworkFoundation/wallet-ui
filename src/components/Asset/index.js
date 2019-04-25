import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Button from 'elements/Button';
import AnimatedNumber from 'elements/AnimatedNumber';

import URL from 'enums/url';
import withRouter from 'hocs/withRouter';
import AssetIcon from 'elements/AssetIcon';
import AssetProgressIcon from 'elements/AssetProgressIcon';

import translate from 'services/translate';
import { externalHistorySelectors } from 'ducks/history/external';
import { gatewaySelectors } from 'ducks/gateway';

import Tooltip from 'src/elements/Tooltip';
import cn from 'utils/bem';
import Translate from 'elements/Translate';

import ExchangeIcon from 'icons/exchange-icon-blue.svg';
import DetokenizationIcon from 'icons/detokenize.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('asset');

class Asset extends React.Component {
  static propTypes = propTypes;

  onSendClick = () => {
    const { asset: { displayName }, routerActions } = this.props;

    routerActions.navigate({
      pathname: URL.SEND,
      search: { asset: displayName }
    });
  };

  onReceiveClick = () => {
    const { asset: { displayName }, routerActions } = this.props;

    routerActions.navigate({
      pathname: URL.RECEIVE,
      search: { asset: displayName }
    });
  };

  onExchangeClick = () => {
    const { asset: { displayName }, routerActions } = this.props;

    routerActions.navigate({
      pathname: URL.EXCHANGE,
      search: { asset: displayName }
    });
  };

  onDetokenizeClick = () => {
    const { asset: { displayName }, routerActions } = this.props;
    routerActions.navigate({
      pathname: URL.DETOKENIZE,
      search: { asset: displayName }
    });
  };

  render() {
    const {
      asset: {
        id,
        displayName,
        name,
        isTokenized,
        displayAmount,
        amount,
        fullName
      },
      className,
      pendingOperationsByAssetId,
      supportedAssetsById
    } = this.props;

    const pendingOperations = pendingOperationsByAssetId[id];
    const disabled = amount === 0;
    const supportedByGateway = supportedAssetsById[id];

    return (
      <div
        className={b(null, null, className)}
        data-testid={`asset-container-${name}`}
      >
        <div className="row">
          {pendingOperations ? (
            <AssetProgressIcon
              className={b('coin-icon')}
              operations={pendingOperations}
            />
          ) : (
            <AssetIcon
              className={b('coin-icon')}
              assetName={name}
              isTokenized={isTokenized}
            />
          )}

          <div className={b('info')}>
            <span className={b('balance')}>
              <AnimatedNumber value={displayAmount} />{' '}
              <span>{displayName}</span>
            </span>
            <span className={b('name')}>{fullName}</span>
          </div>
        </div>
        <div className="row">
          <div className={b('buttons')}>
            <Button
              disabled={disabled}
              className={b('button')}
              label={translate('page.wallet.send')}
              mods="light"
              onClick={this.onSendClick}
            />
            <Button
              className={b('button', 'receive')}
              label={translate('page.wallet.receive')}
              mods="light"
              onClick={this.onReceiveClick}
            />
          </div>

          <div className={b('icons')}>
            <Tooltip
              className={b('tooltip-container')}
              contentClassName={b('tooltip', { disabled: !supportedByGateway })}
              hideOnClick={true}
              mods={['white']}
              useContext
              renderTooltip={() => (
                <button
                  className={b('icon-button', {
                    detokenize: true,
                    disabled: disabled || !supportedByGateway
                  })}
                  onClick={
                    disabled || !supportedByGateway
                      ? null
                      : this.onDetokenizeClick
                  }
                >
                  <DetokenizationIcon className={b('icon')} />
                </button>
              )}
              renderTitle={() =>
                supportedByGateway ? (
                  <Translate path="component.Asset.tooltip.detokenize" />
                ) : (
                  <Translate path="component.Asset.tooltip.notSupported" />
                )
              }
            />

            <Tooltip
              className={b('tooltip-container')}
              contentClassName={b('tooltip')}
              hideOnClick={true}
              mods={['white']}
              useContext
              renderTooltip={() => (
                <button
                  className={b('icon-button', { exchange: true, disabled })}
                  onClick={disabled ? null : this.onExchangeClick}
                >
                  <ExchangeIcon className={b('icon')} />
                </button>
              )}
              renderTitle={() => (
                <Translate path="component.Asset.tooltip.exchange" />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      pendingOperationsByAssetId: externalHistorySelectors.pendingByAssetId(
        state
      ),
      supportedAssetsById: gatewaySelectors.availableAssetsById(state)
    }),
    null
  ),
  withRouter
)(Asset);
