import React from 'react';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('operation-row');

const Row = ({ className, children }) => (
  <div className={b(null, null, className)}>{children}</div>
);

Row.propTypes = propTypes;

export default Row;
