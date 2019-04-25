import React from 'react';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('operation-column');

const Column = ({ className, children }) => (
  <div className={b(null, null, className)}>{children}</div>
);

Column.propTypes = propTypes;

export default Column;
