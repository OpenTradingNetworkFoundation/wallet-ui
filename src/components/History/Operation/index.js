import React from 'react';
import { format } from 'date-fns';

import AssetIcon from 'elements/AssetIcon';

import { INDICATOR_ICON } from 'enums/operation';
import cn from 'utils/bem';

import {
  getIndicatorType,
  statusText,
  getDisplayAmount,
  operationSign
} from './helpers';
import { propTypes } from './props';
import './style.styl';

const b = cn('operation');

class Operation extends React.PureComponent {
  static propTypes = propTypes;

  state = {
    expanded: false
  };

  handleItemClick = () => {
    !this.props.disableDetails &&
      this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      className,
      operation,
      renderOperationDetails,
      disableDetails
    } = this.props;

    const {
      id,
      timeCreated,
      state,
      blockNumber,
      amount,
      internalType,
      internalState
    } = operation;

    const { expanded } = this.state;

    const indicatorType = getIndicatorType(state, internalType);
    const IndicatorIcon = INDICATOR_ICON[indicatorType];
    const displayAmount = getDisplayAmount(
      operationSign(internalType),
      amount.amount
    );
    return (
      <div
        className={b(null, { expanded }, className)}
        data-testid={`operation-container-${id}`}
      >
        <div
          className={b('header', { expanded })}
          onClick={this.handleItemClick}
        >
          <span className={b('date-time')}>
            {blockNumber}
            <span className={b('date')}>
              {timeCreated && format(timeCreated, 'MMM D YYYY')}
            </span>
            {timeCreated && (
              <span className={b('time')}>{format(timeCreated, 'h:mm A')}</span>
            )}
          </span>
          {this.props.renderAsset && (
            <span className={b('asset')}>
              <AssetIcon
                className={b('asset-icon')}
                assetName={amount.asset.name}
              />
              <span className={b('asset-name')}>
                {amount.asset.displayName}
              </span>
            </span>
          )}
          <span
            data-testid={`operation-status-${id}`}
            className={b('status', internalState)}
          >
            <i className={b('indicator-container')}>
              <IndicatorIcon className={b('indicator', indicatorType)} />
            </i>
            <span>{statusText(state, internalType)}</span>
          </span>
          <span className={b('amount', internalType)}>{displayAmount}</span>
        </div>

        {!disableDetails && (
          <div className={b('details', { expanded })}>
            {renderOperationDetails(operation)}
          </div>
        )}
      </div>
    );
  }
}

export default Operation;
