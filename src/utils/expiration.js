import { addYears, addMinutes } from 'date-fns';
import { EXPIRATION } from 'enums/expiration';

export const calculateExpiration = expiration => {
  const now = new Date();

  switch (expiration) {
    case EXPIRATION.YEAR:
      return addYears(now, 1);
    case EXPIRATION.MINUTE:
      return addMinutes(now, 1);
  }
};
