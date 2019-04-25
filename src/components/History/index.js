import React from 'react';

import cn from 'utils/bem';

import Operation from 'components/History/Operation';

import { propTypes } from './props';
import './style.styl';

const b = cn('history');

class History extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const {
      operations = [],
      operationsLimit,
      renderAsset,
      disableDetails,
      renderOperationDetails
    } = this.props;

    return (
      <div className={b()}>
        {operations.slice(0, operationsLimit).map(operation => {
          return (
            <Operation
              operation={operation}
              key={operation.key}
              disableDetails={disableDetails}
              renderAsset={renderAsset}
              className={b('item')}
              renderOperationDetails={renderOperationDetails}
            />
          );
        })}
      </div>
    );
  }
}

export default History;
