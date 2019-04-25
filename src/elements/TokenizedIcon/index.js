import React from 'react';

import cn from 'utils/bem';

import OTNIcon from 'icons/otn-icon.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('tokenized-icon');

const TokenizedIcon = ({ className, Icon }) => (
  <div className={b(null, null, className)}>
    <Icon className={b('main-icon')} />
    <div className={b('otn-icon')}>
      <OTNIcon className={b('svg')} />
    </div>
  </div>
);

TokenizedIcon.propTypes = propTypes;

export default TokenizedIcon;
