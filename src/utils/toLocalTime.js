import { compose, partialRight, ifElse, gt, curry } from 'ramda';
import { addMinutes, subMinutes, format } from 'date-fns';

const toLocalTime = curry((dateFormat, date) =>
  compose(
    partialRight(format, [dateFormat]),
    ifElse(
      gt(0),
      partialRight(addMinutes, [new Date().getTimezoneOffset()]),
      partialRight(subMinutes, [new Date().getTimezoneOffset()]),
      new Date().getTimezoneOffset()
    )
  )(date)
);

export default toLocalTime;
