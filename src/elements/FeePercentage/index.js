import React from 'react';

import cn from 'utils/bem';
import localizer from 'utils/localizer';
import { calculateDisplayPercentage } from 'utils/percentage';

import Spinner from 'elements/Spinner';

import { propTypes } from './props';

import './style.styl';

const b = cn('fee-percentage');

const FeePercentage = ({
  label,
  isLoading,
  percentage,
  showPercentage,
  className
}) => {
  percentage = calculateDisplayPercentage(percentage);

  const percentageLabel = showPercentage ? `(${percentage}%)` : '-';

  return (
    <span className={b(null, null, className)}>
      <span className={b('label')}>
        {label || localizer.getValue('component.FeePercentage.fee')}
      </span>
      <span className={b('value')}>
        {isLoading ? <Spinner className={b('spinner')} /> : percentageLabel}
      </span>
    </span>
  );
};

FeePercentage.propTypes = propTypes;

export default FeePercentage;
