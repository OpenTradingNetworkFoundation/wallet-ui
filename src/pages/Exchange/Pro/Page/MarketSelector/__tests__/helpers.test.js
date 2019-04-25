import { combinations, filterOptions } from '../helpers';

test('combinations return possible combinations of elements in array', () => {
  const input = ['OTN', 'BTC', 'ETH', 'XRP'];

  expect(
    combinations(
      {
        'OTN / BTC': '2018-10-10T14:10:28.191Z',
        'BTC / ETH': '2018-10-10T14:10:30.095Z'
      },
      input
    )
  ).toEqual([
    {
      base: 'BTC',
      quote: 'ETH',
      favorite: true,
      timeAdded: '2018-10-10T14:10:30.095Z'
    },
    {
      base: 'OTN',
      quote: 'BTC',
      favorite: true,
      timeAdded: '2018-10-10T14:10:28.191Z'
    },
    { base: 'OTN', quote: 'ETH', favorite: false, timeAdded: undefined },
    { base: 'OTN', quote: 'XRP', favorite: false, timeAdded: undefined },
    { base: 'BTC', quote: 'XRP', favorite: false, timeAdded: undefined },
    { base: 'ETH', quote: 'XRP', favorite: false, timeAdded: undefined }
  ]);
});

test('filterOptions return options filtered by base', () => {
  const options = [
    { base: 'a', quote: 'b' },
    { base: 'a', quote: 'c' },
    { base: 'a', quote: 'd' },
    { base: 'b', quote: 'c' },
    { base: 'b', quote: 'd' },
    { base: 'c', quote: 'd' }
  ];
  expect(filterOptions(options, 'b')).toEqual([
    { base: 'a', quote: 'b' },
    { base: 'b', quote: 'c' },
    { base: 'b', quote: 'd' }
  ]);

  expect(filterOptions(options, '')).toEqual(options);
  expect(filterOptions(options, 'bass')).toEqual([]);
});
