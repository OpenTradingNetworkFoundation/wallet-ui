import React from 'react';

import AssetIcon from 'elements/AssetIcon';
import FeePercentage from 'elements/FeePercentage';
import Translate from 'elements/Translate';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('send-confirmation');

const Component = ({
  username,
  asset,
  feeAsset,
  amount,
  accountName,
  feeAmount,
  memo
}) => (
  <div className={b()}>
    <div className={b('row', 'title')}>
      <div className={b('asset-title')}>
        <Translate path="page.send.confirmation.asset" />
      </div>
      <div className={b('asset-name')}>
        <div className={b('asset-display-name')}>{asset.displayName}</div>
        <div className={b('asset-full-name')}>
          <AssetIcon
            className={b('icon')}
            assetName={asset.name}
            isTokenized={false}
          />
          <span className={b('text')}>{asset.fullName}</span>
        </div>
      </div>
    </div>

    <div className={b('row', 'info')}>
      <div className={b('col')}>
        <div className={b('header')}>
          <Translate path="page.send.confirmation.from" />
        </div>
        <div className={b('value')}>{accountName}</div>
      </div>

      <div className={b('col')}>
        <div className={b('header')}>
          <Translate path="page.send.confirmation.to" />
        </div>
        <div className={b('value')}>{username}</div>
      </div>

      <div className={b('col')}>
        <div className={b('header')}>
          <Translate path="page.send.confirmation.amount" />
        </div>
        <div className={b('value')}>{amount}</div>
      </div>

      <div className={b('col')}>
        <div className={b('header')}>
          <FeePercentage
            percentage={feeAmount / amount}
            showPercentage={feeAsset.id === asset.id}
          />
        </div>
        <div className={b('value', 'fee')}>
          {feeAmount} {feeAsset.displayName}
        </div>
      </div>
    </div>

    {memo && (
      <div className={b('row', 'info')}>
        <div className={b('col')}>
          <div className={b('header')}>
            <Translate path="page.send.confirmation.memo" />
          </div>
          <div className={b('value', 'memo')}>{memo}</div>
        </div>
      </div>
    )}
  </div>
);

Component.propTypes = propTypes;

export default Component;
