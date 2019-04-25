import React from 'react';
import { cleanup } from 'react-testing-library';

import * as ordersApi from 'api/ordersApi';

import setUpMocks from 'src/__utils__/setUpMocks';
import mockMethod from 'src/__utils__/mockMethod';
import { renderWithRedux } from 'src/__utils__';
import { getUserAccount } from 'src/__fixtures__/account';

import OpenOrdersProvider, { Consumer } from '../index';

import { plainOrders, formattedOrders, balance } from './fixtures';

const state = {
  account: getUserAccount('1.2.0'),
  balance,
  auth: {
    token: { token: 'token' }
  }
};

describe('OpenOrders', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('render with children', () => {
      const { container, queryByText } = renderWithRedux(
        <OpenOrdersProvider>Children</OpenOrdersProvider>,
        state
      );

      expect(container).not.toBeNull();
      expect(queryByText('Children')).not.toBeNull();
    });
  });

  describe('logic', () => {
    describe('load orders', () => {
      setUpMocks(() => [
        mockMethod(ordersApi, 'getAllOpenOrders', () => plainOrders)
      ]);

      test('load and provide data', async () => {
        const children = jest.fn(() => null);
        let loadOrders;

        const { container } = renderWithRedux(
          <OpenOrdersProvider>
            <Consumer>
              {({ orderCount, orders, loadOrders: loadOrdersMethod }) => {
                loadOrders = loadOrdersMethod;
                return children(orderCount, orders);
              }}
            </Consumer>
          </OpenOrdersProvider>,
          state
        );

        expect(container).not.toBeNull();
        expect(children).toBeCalledWith(0, []);

        await loadOrders();

        expect(children).toBeCalledWith(3, formattedOrders);
      });
    });

    describe('close order', () => {
      let mocks;

      setUpMocks(
        () => [mockMethod(ordersApi, 'closeOrder', () => {})],
        setMocks => {
          mocks = setMocks;
        }
      );

      test('close order', async () => {
        let closeOrder;
        const order = {};

        const { container } = renderWithRedux(
          <OpenOrdersProvider>
            <Consumer>
              {({ closeOrder: closeOrderMethod }) => {
                closeOrder = closeOrderMethod;
                return null;
              }}
            </Consumer>
          </OpenOrdersProvider>,
          state
        );

        expect(container).not.toBeNull();

        await closeOrder('1.2.0')(order);

        expect(mocks[0]).toBeCalledWith(order, '1.2.0', {
          publicKey: 'key_active',
          privateKey: state.auth.token
        });
      });
    });
  });
});
