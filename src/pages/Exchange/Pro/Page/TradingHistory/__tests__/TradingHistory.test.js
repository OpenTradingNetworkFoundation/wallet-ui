import React from 'react';
import { cleanup, waitForElement } from 'react-testing-library';
import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';
import { getAssets } from 'src/__fixtures__/assets';

import * as marketApi from 'api/marketApi';

import TradingHistory from '../index';

mockMethod(
  marketApi,
  'getTradeHistory',
  async base =>
    base.asset === 'OTN'
      ? [
          {
            id: '5.0.1469',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1469 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.0' },
              order_id: '1.7.274777',
              account_id: '1.2.19',
              pays: { amount: 1518923, asset_id: '1.3.2' },
              receives: { amount: '20000000000', asset_id: '1.3.0' },
              fill_price: {
                base: { amount: 1518923, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: true
            }
          },
          {
            id: '5.0.1468',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1468 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.2' },
              order_id: '1.7.274797',
              account_id: '1.2.20',
              pays: { amount: '20000000000', asset_id: '1.3.0' },
              receives: { amount: 1518923, asset_id: '1.3.2' },
              fill_price: {
                base: { amount: 1518923, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: false
            }
          },
          {
            id: '5.0.1467',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1467 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.0' },
              order_id: '1.7.274775',
              account_id: '1.2.19',
              pays: { amount: 1532669, asset_id: '1.3.2' },
              receives: { amount: '20000000000', asset_id: '1.3.0' },
              fill_price: {
                base: { amount: 1532669, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: true
            }
          },
          {
            id: '5.0.1466',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1466 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.2' },
              order_id: '1.7.274797',
              account_id: '1.2.20',
              pays: { amount: '20000000000', asset_id: '1.3.0' },
              receives: { amount: 1532669, asset_id: '1.3.2' },
              fill_price: {
                base: { amount: 1532669, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: false
            }
          },
          {
            id: '5.0.1465',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1465 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.0' },
              order_id: '1.7.274773',
              account_id: '1.2.19',
              pays: { amount: 1546666, asset_id: '1.3.2' },
              receives: { amount: '20000000000', asset_id: '1.3.0' },
              fill_price: {
                base: { amount: 1546666, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: true
            }
          },
          {
            id: '5.0.1464',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1464 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.2' },
              order_id: '1.7.274797',
              account_id: '1.2.20',
              pays: { amount: '20000000000', asset_id: '1.3.0' },
              receives: { amount: 1546666, asset_id: '1.3.2' },
              fill_price: {
                base: { amount: 1546666, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: false
            }
          },
          {
            id: '5.0.1463',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1463 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.0' },
              order_id: '1.7.274771',
              account_id: '1.2.19',
              pays: { amount: 1560921, asset_id: '1.3.2' },
              receives: { amount: '20000000000', asset_id: '1.3.0' },
              fill_price: {
                base: { amount: 1560921, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: true
            }
          },
          {
            id: '5.0.1462',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1462 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.2' },
              order_id: '1.7.274797',
              account_id: '1.2.20',
              pays: { amount: '20000000000', asset_id: '1.3.0' },
              receives: { amount: 1560921, asset_id: '1.3.2' },
              fill_price: {
                base: { amount: 1560921, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: false
            }
          },
          {
            id: '5.0.1461',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1461 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.0' },
              order_id: '1.7.274769',
              account_id: '1.2.19',
              pays: { amount: 1575441, asset_id: '1.3.2' },
              receives: { amount: '20000000000', asset_id: '1.3.0' },
              fill_price: {
                base: { amount: 1575441, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: true
            }
          },
          {
            id: '5.0.1460',
            key: { base: '1.3.0', quote: '1.3.2', sequence: -1460 },
            time: '2018-10-18T17:25:25',
            op: {
              fee: { amount: 0, asset_id: '1.3.2' },
              order_id: '1.7.274797',
              account_id: '1.2.20',
              pays: { amount: '20000000000', asset_id: '1.3.0' },
              receives: { amount: 1575441, asset_id: '1.3.2' },
              fill_price: {
                base: { amount: 1575441, asset_id: '1.3.2' },
                quote: { amount: '20000000000', asset_id: '1.3.0' }
              },
              is_maker: false
            }
          }
        ]
      : []
);

jest.mock('bitsharesjs-ws', () => ({
  Apis: {
    instance: () => ({
      history_api: () => ({
        exec: () =>
          Promise.resolve([
            {
              id: '5.0.1469',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1469 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.0' },
                order_id: '1.7.274777',
                account_id: '1.2.19',
                pays: { amount: 1518923, asset_id: '1.3.2' },
                receives: { amount: '20000000000', asset_id: '1.3.0' },
                fill_price: {
                  base: { amount: 1518923, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: true
              }
            },
            {
              id: '5.0.1468',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1468 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.2' },
                order_id: '1.7.274797',
                account_id: '1.2.20',
                pays: { amount: '20000000000', asset_id: '1.3.0' },
                receives: { amount: 1518923, asset_id: '1.3.2' },
                fill_price: {
                  base: { amount: 1518923, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: false
              }
            },
            {
              id: '5.0.1467',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1467 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.0' },
                order_id: '1.7.274775',
                account_id: '1.2.19',
                pays: { amount: 1532669, asset_id: '1.3.2' },
                receives: { amount: '20000000000', asset_id: '1.3.0' },
                fill_price: {
                  base: { amount: 1532669, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: true
              }
            },
            {
              id: '5.0.1466',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1466 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.2' },
                order_id: '1.7.274797',
                account_id: '1.2.20',
                pays: { amount: '20000000000', asset_id: '1.3.0' },
                receives: { amount: 1532669, asset_id: '1.3.2' },
                fill_price: {
                  base: { amount: 1532669, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: false
              }
            },
            {
              id: '5.0.1465',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1465 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.0' },
                order_id: '1.7.274773',
                account_id: '1.2.19',
                pays: { amount: 1546666, asset_id: '1.3.2' },
                receives: { amount: '20000000000', asset_id: '1.3.0' },
                fill_price: {
                  base: { amount: 1546666, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: true
              }
            },
            {
              id: '5.0.1464',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1464 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.2' },
                order_id: '1.7.274797',
                account_id: '1.2.20',
                pays: { amount: '20000000000', asset_id: '1.3.0' },
                receives: { amount: 1546666, asset_id: '1.3.2' },
                fill_price: {
                  base: { amount: 1546666, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: false
              }
            },
            {
              id: '5.0.1463',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1463 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.0' },
                order_id: '1.7.274771',
                account_id: '1.2.19',
                pays: { amount: 1560921, asset_id: '1.3.2' },
                receives: { amount: '20000000000', asset_id: '1.3.0' },
                fill_price: {
                  base: { amount: 1560921, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: true
              }
            },
            {
              id: '5.0.1462',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1462 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.2' },
                order_id: '1.7.274797',
                account_id: '1.2.20',
                pays: { amount: '20000000000', asset_id: '1.3.0' },
                receives: { amount: 1560921, asset_id: '1.3.2' },
                fill_price: {
                  base: { amount: 1560921, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: false
              }
            },
            {
              id: '5.0.1461',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1461 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.0' },
                order_id: '1.7.274769',
                account_id: '1.2.19',
                pays: { amount: 1575441, asset_id: '1.3.2' },
                receives: { amount: '20000000000', asset_id: '1.3.0' },
                fill_price: {
                  base: { amount: 1575441, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: true
              }
            },
            {
              id: '5.0.1460',
              key: { base: '1.3.0', quote: '1.3.2', sequence: -1460 },
              time: '2018-10-18T17:25:25',
              op: {
                fee: { amount: 0, asset_id: '1.3.2' },
                order_id: '1.7.274797',
                account_id: '1.2.20',
                pays: { amount: '20000000000', asset_id: '1.3.0' },
                receives: { amount: 1575441, asset_id: '1.3.2' },
                fill_price: {
                  base: { amount: 1575441, asset_id: '1.3.2' },
                  quote: { amount: '20000000000', asset_id: '1.3.0' }
                },
                is_maker: false
              }
            }
          ])
      })
    })
  }
}));

jest.mock('react-virtualized', () => ({
  ...require.requireActual('react-virtualized'),
  AutoSizer: ({ children }) => children({ width: 100, height: 1000 })
}));

describe('<TradingHistory />', () => {
  afterEach(cleanup);

  test('renders', async () => {
    const { getByText, container } = renderWithRedux(
      <TradingHistory base={getAssets()[0]} quote={getAssets()[1]} />
    );
    await waitForElement(() => getByText('200'), container);

    expect(getByText('200')).not.toBeNull();
    expect(getByText('0.01518923')).not.toBeNull();
  });

  test('renders placeholder', async () => {
    const { queryByText } = renderWithRedux(
      <TradingHistory base={getAssets()[0]} quote={getAssets()[1]} />
    );
    expect(queryByText('There is no trading history')).not.toBeNull();
  });
});
