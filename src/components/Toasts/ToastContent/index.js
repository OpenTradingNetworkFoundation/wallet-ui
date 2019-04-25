import React from 'react';
import { connect } from 'react-redux';

import cn from 'utils/bem';
import AssetAmount from 'models/AssetAmount';
import { ASSET_ICON } from 'enums/asset';

import { balanceSelectors } from 'ducks/balance';

import TokenizedIcon from 'elements/TokenizedIcon';

import { propTypes } from './props';
import './style.styl';

const b = cn('toast-content');

const ToastContent = ({ payload, balances }) => {
  if (payload.message) {
    return payload.message;
  } else if (payload.body) {
    const { pays, receives, amount, assetId } = payload.body;
    if (pays && receives) {
      const payAsset = balances.find(asset => asset.id === pays.assetId);
      const receiveAsset = balances.find(
        asset => asset.id === receives.assetId
      );

      const PayIcon = ASSET_ICON[payAsset.asset];
      const ReceiveIcon = ASSET_ICON[receiveAsset.asset];

      return (
        <React.Fragment>
          <div className={b(null, 'small')}>
            <span className={b('label')}>Give:</span>{' '}
            <PayIcon className={b('icon')} />
            <span className={b('amount')}>
              {AssetAmount.parse(pays.amount, payAsset.precision)}{' '}
              {payAsset.displayName}
            </span>
          </div>
          <div className={b(null, 'small')}>
            <span className={b('label')}>Get:</span>
            <ReceiveIcon className={b('icon')} />
            <span className={b('amount')}>
              {AssetAmount.parse(receives.amount, receiveAsset.precision)}{' '}
              {receiveAsset.displayName}
            </span>
          </div>
        </React.Fragment>
      );
    } else {
      const receivedAsset = balances.find(asset => asset.id === assetId);
      const ReceiveIcon = ASSET_ICON[receivedAsset.asset];

      return (
        <div className={b()}>
          {receivedAsset.isTokenized ? (
            <TokenizedIcon className={b('icon')} Icon={ReceiveIcon} />
          ) : (
            <ReceiveIcon className={b('icon')} />
          )}
          <span className={b('amount')}>
            {AssetAmount.parse(amount, receivedAsset.precision)}{' '}
            {receivedAsset.displayName}
          </span>
        </div>
      );
    }
  }
};

ToastContent.propTypes = propTypes;

export default connect(state => ({
  balances: balanceSelectors.balances(state)
}))(ToastContent);
