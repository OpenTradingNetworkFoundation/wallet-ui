import { curry } from 'ramda';

export const reduceByKey = curry((key, arr) =>
  arr.reduce((res, obj) => ({ ...res, [obj[key]]: obj }), {})
);

export const reduceById = reduceByKey('id');
