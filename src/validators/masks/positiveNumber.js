import { replace, compose, concat } from 'ramda';

const DEFAULT_PRECISION = 8;

const getPrecision = (precision = DEFAULT_PRECISION) =>
  new RegExp(`^0*([0-9]+.{0,1}[0-9]{0,${precision}})[0-9]*$`);

const positiveNumberMask = (value, precision) =>
  compose(
    replace(/^\./g, '0.'),
    replace(getPrecision(precision), '$1'),
    replace(/^0?(\d)/, '$1'),
    replace(/[^0-9.]+/g, ''),
    replace(/^([^.]*\.)(.*)$/, (a, b, c) => concat(b, replace(/\./g, '', c)))
  )(value);

export default positiveNumberMask;
