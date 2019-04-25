import React from 'react';

import cn from 'utils/bem';
import localizer from 'utils/localizer';

import Spinner from 'elements/Spinner';

import { propTypes, defaultProps } from './props';

import './style.styl';

const b = cn('price-bar');

class PriceBar extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const {
      price,
      fromAssetName,
      toAssetName,
      isLoading,
      isAvailable,
      className
    } = this.props;

    return (
      <div className={b(null, null, className)}>
        {isAvailable ? (
          <React.Fragment>
            {localizer.getValue('elements.Price.label')}{' '}
            {isLoading ? <Spinner className={b('spinner')} /> : price}{' '}
            {fromAssetName} = 1 {toAssetName}
          </React.Fragment>
        ) : (
          <span className={b('placeholder')}>
            {localizer.getValue('elements.Price.unavailable')}
          </span>
        )}
      </div>
    );
  }
}

export default PriceBar;
