import { format } from 'date-fns';

import toLocalTime from '../toLocalTime';

describe('toLocalTime', () => {
  test('correctly parse UTC date', () => {
    const date = new Date();
    const isoDate = date.toISOString().replace(/\.+[0-9]+Z$/g, '');

    expect(toLocalTime('D MMM HH:mm:ss', isoDate)).toBe(
      format(date, 'D MMM HH:mm:ss')
    );
  });
});
