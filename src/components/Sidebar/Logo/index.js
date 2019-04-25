import React from 'react';

import URL from 'enums/url';
import Url from 'elements/Url';
import cn from 'utils/bem';

import OTNIcon from 'icons/otn-icon.svg';

import { propTypes, defaultProps } from './props';

import './style.styl';

const b = cn('sidebar-logo');

const SidebarLogo = ({ small }) => (
  <Url className={b(null, { small })} link={URL.WALLET}>
    <OTNIcon className={b('otn-icon')} />
    <span data-testid="logo-text" className={b('text', { small })}>
      OTN
    </span>
  </Url>
);

SidebarLogo.propTypes = propTypes;
SidebarLogo.defaultProps = defaultProps;

export default SidebarLogo;
