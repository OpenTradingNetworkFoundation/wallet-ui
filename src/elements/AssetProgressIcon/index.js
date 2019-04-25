import React from 'react';
import get from 'lodash/get';

import cn from 'utils/bem';
import { INDICATOR_ICON } from 'enums/operation';

import PendingIcon from 'icons/pending-big.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('asset-progress-icon');

class AssetProgressIcon extends React.Component {
  static propTypes = propTypes;

  render() {
    const { operations, className, id } = this.props;
    const onePendingOperation = operations.length === 1;
    const operationType = get(operations, '0.internalType', null);
    const OperationIcon = INDICATOR_ICON[operationType];

    return (
      <div
        className={b(null, null, className)}
        data-testid={`asset-progress-icon-${id}`}
      >
        <PendingIcon className={b('progress-icon')} />
        {onePendingOperation ? (
          <OperationIcon className={b('operation-icon', operationType)} />
        ) : (
          <span className={b('content')}>{operations.length}</span>
        )}
      </div>
    );
  }
}

export default AssetProgressIcon;
