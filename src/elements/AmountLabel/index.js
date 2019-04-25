import React from 'react';

import cn from 'utils/bem';

import WalletAssetIcon from 'icons/wallet-asset.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('amount-label');

const AmountLabel = ({ className, children }) => (
  <div className={b(null, null, className)}>
    <WalletAssetIcon className={b('icon')} />
    {children}
  </div>
);

AmountLabel.propTypes = propTypes;

export default AmountLabel;
