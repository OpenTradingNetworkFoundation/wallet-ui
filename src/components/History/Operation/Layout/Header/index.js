import React from 'react';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('operation-header');

const Header = ({ className, children }) => (
  <div className={b(null, null, className)}>{children}</div>
);

Header.propTypes = propTypes;

export default Header;
