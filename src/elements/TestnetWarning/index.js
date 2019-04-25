import React from 'react';

import Warning from 'elements/Warning';
import cn from 'utils/bem';
import { isProd } from 'utils/env';

import { propTypes } from './props';

const b = cn('testnet-warning');

const TestnetWarning = props =>
  !isProd() ? (
    <Warning className={b(null, null, props.className)}>
      {props.message}
    </Warning>
  ) : null;

TestnetWarning.propTypes = propTypes;

export default TestnetWarning;
