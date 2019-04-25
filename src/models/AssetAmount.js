import { padStart, padEnd, trimEnd } from 'lodash';
import * as math from 'mathjs';
import { compose, curry } from 'ramda';

const maxPossibleValue = 1e20;

const trimZeros = value =>
  ~value.indexOf('.') ? trimEnd(value, '0').replace(/\.$/, '') : value;

const parse = (amount, precision) => {
  if (!amount) {
    return '0';
  }

  const value = String(amount);

  if (!precision) {
    return value;
  }

  const pointIndex = value.length - precision;

  let fraction =
    value.length > precision
      ? value.slice(pointIndex)
      : padStart(value, precision, '0');
  fraction = fraction.replace(/0+$/g, '');

  const int = value.length > precision ? value.slice(0, pointIndex) : '0';

  return fraction ? `${int}.${fraction}` : int;
};

const normalize = (amount, precision) => {
  if (!amount) {
    return 0;
  }

  const [int, fraction = ''] = amount.split('.');

  const start = int === '0' ? '' : int;
  const end = padEnd(fraction.slice(0, precision), precision, '0');

  const result = `${start}${end}`.replace(/^0+/g, '');

  return result || 0;
};

const round = (value, precision, func = Math.round) => {
  if (!value) {
    return '0';
  }

  // we can't neither display, not send to node such a value anyway
  if (math.fix(value) > maxPossibleValue) {
    return maxPossibleValue;
  }

  const pow = Math.pow(10, precision);
  const result = func(value * pow) / pow;

  return trimZeros(result.toFixed(precision));
};

const sumDecimal = (a, b, precision) => {
  return parse(+normalize(a, precision) + +normalize(b, precision), precision);
};

const subtract = (a, b, precision) =>
  math
    .chain(math.bignumber(a))
    .subtract(math.bignumber(b))
    .format({
      precision,
      notation: 'fixed'
    })
    .done();

const subtractDecimal = compose(trimZeros, subtract);

const multiply = (a, b, precision) => {
  return math.format(+round(math.multiply(a, b), precision, Math.ceil), {
    notation: 'fixed'
  });
};

const divide = (a, b, precision) => {
  return math.format(+round(math.divide(a, b), precision, Math.ceil), {
    notation: 'fixed'
  });
};
export const parseAmount = curry(parse);
export const normalizeAmount = curry(normalize);
export const roundAmount = curry(round);

export default {
  multiply,
  divide,
  subtractDecimal,
  sumDecimal,
  round,
  normalize,
  parse
};
