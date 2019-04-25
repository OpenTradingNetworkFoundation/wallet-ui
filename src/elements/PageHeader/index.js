import React from 'react';

import cn from 'utils/bem';
import Translate from 'elements/Translate';

import { propTypes } from './props';

import './style.styl';

const b = cn('page-header');

const PageHeader = ({ Icon, titlePath }) => (
  <span className={b()}>
    <Icon className={b('icon')} />
    <Translate path={titlePath} />
  </span>
);

PageHeader.propTypes = propTypes;

export default PageHeader;
