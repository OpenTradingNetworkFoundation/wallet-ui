import React from 'react';
import { fireEvent, cleanup, waitForElement } from 'react-testing-library';
import { pick } from 'lodash';

import { renderWithRedux } from 'src/__utils__';
import { getTokenizedAssets } from 'src/__fixtures__/assets';
import { getUserAccount } from 'src/__fixtures__/account';
import { limitOrders } from 'src/__fixtures__/limitOrders';

import * as feeApi from 'api/feeApi';
import * as ordersApi from 'api/ordersApi';

import Page from '../index';

const getState = () => {
  const balances = getTokenizedAssets();
  return {
    balance: {
      isFetching: false,
      assets: balances.map(balance =>
        pick(balance, ['id', 'name', 'asset', 'precision', 'amount'])
      )
    },
    exchangeFee: {
      isLoading: false,
      feeAmount: '10000'
    },
    rates: {
      price: '4000',
      availableAmount: '1000000000',
      isAvailable: true,
      isLoading: false
    },
    account: getUserAccount()
  };
};

const mocks = [
  jest.spyOn(feeApi, 'getExchangeFee').mockImplementation(async () => '10000'),

  jest.spyOn(ordersApi, 'getOrders').mockImplementation(async () => limitOrders)
];

describe('<ExchangePage />', () => {
  afterEach(cleanup);

  afterAll(() => mocks.forEach(mock => mock.mockRestore()));

  test('empty balances', () => {
    const { container, getByText } = renderWithRedux(<Page />, {
      balance: {
        isFetching: false,
        assets: []
      }
    });

    expect(container).not.toBeNull();

    expect(getByText('No assets to be exchanged')).not.toBeNull();
  });

  describe('fill and submit form', () => {
    test('should emit action with expected params', async () => {
      const { container, getByText, getAllByPlaceholderText } = renderWithRedux(
        <Page />,
        getState()
      );

      expect(container).not.toBeNull();

      await waitForElement(() => getByText('-'), container);

      const [fromInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = '0.01';

      fireEvent.change(fromInput);

      await waitForElement(() => getByText('0.0001 OTN.BTC'), container);

      // TODO test the page properly
    });
  });
});
