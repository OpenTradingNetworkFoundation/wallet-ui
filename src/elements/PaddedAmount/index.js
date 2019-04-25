import { padEnd, toString } from 'lodash';

import { propTypes, defaultProps } from './props';

const PaddedAmount = ({ precision, value }) => {
  const [int, float = ''] = toString(value).split('.');

  return `${int}.${padEnd(float.slice(0, precision), precision, '0')}`;
};

PaddedAmount.propTypes = propTypes;
PaddedAmount.defaultProps = defaultProps;

export default PaddedAmount;
