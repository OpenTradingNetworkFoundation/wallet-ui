import { tradeReducer } from 'helpers/marketApiHelpers';

test('tradeReducer', () => {
  const trades = [
    {
      price: '0.00010000',
      value: '0.0001',
      amount: '0.00000001',
      date: '2018-10-22 15:27:50',
      type: 'BUY',
      key: 89
    },
    {
      price: '0.00099900',
      value: '0.00001001',
      amount: '0.00000001',
      date: '2018-10-22 15:27:20',
      type: 'SELL',
      key: 87
    },
    {
      price: '0.00099900',
      value: '0.00001001',
      amount: '0.00000001',
      date: '2018-10-22 15:27:20',
      type: 'SELL',
      key: 85
    },
    {
      price: '0.00100000',
      value: '0.00001',
      amount: '0.00000001',
      date: '2018-10-22 15:24:20',
      type: 'SELL',
      key: 83
    },
    {
      price: '0.00000100',
      value: '40',
      amount: '0.00004',
      date: '2018-10-22 15:20:50',
      type: 'SELL',
      key: 81
    },
    {
      price: '0.00001000',
      value: '4',
      amount: '0.00004001',
      date: '2018-10-22 15:18:20',
      type: 'SELL',
      key: 79
    },
    {
      price: '0.00000100',
      value: '1',
      amount: '0.000001',
      date: '2018-10-22 15:16:50',
      type: 'SELL',
      key: 77
    },
    {
      price: '0.00000100',
      value: '1',
      amount: '0.000001',
      date: '2018-10-22 15:16:10',
      type: 'BUY',
      key: 75
    },
    {
      price: '0.00000100',
      value: '4',
      amount: '0.000004',
      date: '2018-10-22 15:15:00',
      type: 'SELL',
      key: 73
    },
    {
      price: '0.00000100',
      value: '1',
      amount: '0.000001',
      date: '2018-10-22 15:14:25',
      type: 'SELL',
      key: 71
    },
    {
      price: '0.00000100',
      value: '1',
      amount: '0.000001',
      date: '2018-10-22 15:05:10',
      type: 'SELL',
      key: 69
    },
    {
      price: '0.00178900',
      value: '1',
      amount: '0.001789',
      date: '2018-10-22 15:01:10',
      type: 'BUY',
      key: 67
    },
    {
      price: '0.00019000',
      value: '1',
      amount: '0.00019',
      date: '2018-10-22 14:59:05',
      type: 'SELL',
      key: 65
    },
    {
      price: '0.00197900',
      value: '0.8',
      amount: '0.0015832',
      date: '2018-10-22 14:57:30',
      type: 'SELL',
      key: 63
    },
    {
      price: '0.00197900',
      value: '0.1',
      amount: '0.0001979',
      date: '2018-10-22 14:57:00',
      type: 'SELL',
      key: 61
    },
    {
      price: '0.00197900',
      value: '0.1',
      amount: '0.0001979',
      date: '2018-10-22 14:56:05',
      type: 'SELL',
      key: 59
    },
    {
      price: '0.00006999',
      value: '1',
      amount: '0.00006999',
      date: '2018-10-22 14:35:15',
      type: 'SELL',
      key: 57
    },
    {
      price: '0.00007000',
      value: '1',
      amount: '0.00007',
      date: '2018-10-22 14:34:45',
      type: 'SELL',
      key: 55
    },
    {
      price: '0.00007000',
      value: '1',
      amount: '0.00007',
      date: '2018-10-22 14:32:15',
      type: 'SELL',
      key: 53
    },
    {
      price: '0.00007000',
      value: '1',
      amount: '0.00007',
      date: '2018-10-22 14:31:10',
      type: 'SELL',
      key: 51
    },
    {
      price: '0.00007355',
      value: '0.00013597',
      amount: '0.00000001',
      date: '2018-10-22 14:30:55',
      type: 'BUY',
      key: 49
    },
    {
      price: '0.00007054',
      value: '1',
      amount: '0.00007054',
      date: '2018-10-22 13:39:05',
      type: 'SELL',
      key: 47
    },
    {
      price: '0.00007054',
      value: '1',
      amount: '0.00007054',
      date: '2018-10-22 13:38:55',
      type: 'SELL',
      key: 45
    },
    {
      price: '0.00007054',
      value: '1',
      amount: '0.00007054',
      date: '2018-10-22 13:38:05',
      type: 'SELL',
      key: 43
    },
    {
      price: '0.00007054',
      value: '1',
      amount: '0.00007054',
      date: '2018-10-22 13:38:00',
      type: 'SELL',
      key: 41
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:20',
      type: 'SELL',
      key: 39
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:20',
      type: 'SELL',
      key: 37
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:15',
      type: 'SELL',
      key: 35
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:15',
      type: 'SELL',
      key: 33
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:10',
      type: 'SELL',
      key: 31
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:10',
      type: 'SELL',
      key: 29
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:05',
      type: 'SELL',
      key: 27
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:05',
      type: 'SELL',
      key: 25
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:00',
      type: 'SELL',
      key: 23
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:37:00',
      type: 'SELL',
      key: 21
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:55',
      type: 'SELL',
      key: 19
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:50',
      type: 'SELL',
      key: 17
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:45',
      type: 'SELL',
      key: 15
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:45',
      type: 'SELL',
      key: 13
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:45',
      type: 'SELL',
      key: 11
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:40',
      type: 'SELL',
      key: 9
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:40',
      type: 'SELL',
      key: 7
    },
    {
      price: '0.00007075',
      value: '1',
      amount: '0.00007075',
      date: '2018-10-22 13:36:40',
      type: 'SELL',
      key: 5
    },
    {
      price: '0.00007077',
      value: '1',
      amount: '0.00007077',
      date: '2018-10-22 13:31:00',
      type: 'SELL',
      key: 3
    },
    {
      price: '0.00007318',
      value: '1',
      amount: '0.00007318',
      date: '2018-10-22 12:57:00',
      type: 'SELL',
      key: 1
    }
  ];

  expect(
    trades.reduce(tradeReducer, {
      trades: [],
      sell: [-Infinity, -Infinity, -Infinity],
      buy: [-Infinity, -Infinity, -Infinity]
    })
  ).toEqual({
    trades,
    buy: [1, 0.00013597, 0.0001],
    sell: [40, 4, 1]
  });
});
