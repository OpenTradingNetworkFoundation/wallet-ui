import { divide, compose, __ } from 'ramda';

export const minutes = divide(__, 60);
export const hours = compose(divide(__, 60), minutes);
export const days = compose(divide(__, 24), hours);

export const getUTCDate = () => {
  const date = new Date(Date.now());

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};
