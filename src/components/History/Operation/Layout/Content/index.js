import React from 'react';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('operation-content');

const Content = ({ children, className }) => (
  <div className={b(null, null, className)}>{children}</div>
);

Content.propTypes = propTypes;

export default Content;
