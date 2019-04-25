import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import { Provider } from 'src/providers/OpenOrders';
import { getUserAccount } from 'src/__fixtures__/account';

import OpenPositions from '../index';

const state = {
  account: getUserAccount('1.2.0')
};

describe('<OpenPositions />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('Empty', () => {
      const { container, queryByText } = renderWithRedux(
        <Provider value={{ orders: [], closeOrder: () => {} }}>
          <OpenPositions />
        </Provider>,
        state
      );

      expect(container).not.toBeNull();
      expect(queryByText('no-open-positions.svg')).not.toBeNull();
      expect(queryByText('You have no open positions yet')).not.toBeNull();
    });

    test('List', () => {
      const expiration = new Date().toISOString();

      const order = {
        id: 1,
        base: {
          name: 'OTN',
          displayAmount: '1.2'
        },
        quote: {
          name: 'BTC',
          displayAmount: '2.2'
        },
        type: 'BUY',
        expiration: expiration.replace(/\.+[0-9]+Z$/g, ''),
        percentage: 25,
        price: '0.02'
      };

      const { container, queryByText } = renderWithRedux(
        <Provider value={{ orders: [order], closeOrder: () => {} }}>
          <OpenPositions />
        </Provider>,
        state
      );

      expect(container).not.toBeNull();
      expect(queryByText('no-open-positions.svg')).toBeNull();
      expect(queryByText('You have no open positions yet')).toBeNull();
      expect(queryByText('OTN / BTC')).not.toBeNull();
    });
  });
});
