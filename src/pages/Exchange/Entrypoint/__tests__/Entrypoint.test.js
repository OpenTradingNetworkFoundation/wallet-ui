import React from 'react';
import { fireEvent, cleanup, wait } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';
import setUpMocks from 'src/__utils__/setUpMocks';

import { getAssets } from 'src/__fixtures__/assets';
import { getUserAccount } from 'src/__fixtures__/account';

import * as marketApi from 'api/marketApi';
import * as ordersApi from 'api/ordersApi';
import localStorage from 'utils/localStorage';

import Entrypoint from '../index';

const getState = (mode, hasBalances = true) => ({
  interfaceMode: {
    mode
  },
  auth: {
    token: { token: 'token' }
  },
  balance: hasBalances
    ? { isFetching: false, assets: getAssets() }
    : { isFetching: false, assets: [] },
  account: getUserAccount('1.2.0')
});

const makeMocks = (isPro = false) => {
  setUpMocks(() => [
    mockMethod(localStorage, 'get', () => isPro),
    mockMethod(localStorage, 'set', () => {})
  ]);
};

describe('<ExchangeEntrypoint />', () => {
  afterEach(cleanup);

  setUpMocks(() => [
    mockMethod(marketApi, 'tickerVolume', async () => [
      { highest_bid: '10', percent_change: '25' },
      { quote_volume: '100' }
    ]),

    mockMethod(ordersApi, 'getOrders', async () => []),
    mockMethod(ordersApi, 'getAllOpenOrders', async () => [])
  ]);

  describe('render', () => {
    describe('light', () => {
      makeMocks();

      test('Light', () => {
        const {
          container,
          queryByText,
          queryAllByText,
          queryByTestId
        } = renderWithRedux(<Entrypoint />, getState('Light'), '/exchange/');

        expect(container).not.toBeNull();

        expect(queryByText('Exchange')).not.toBeNull();
        expect(queryAllByText('Pro')).toHaveLength(1);

        const leftButton = queryByTestId('switcher-button-left');
        expect(leftButton).not.toBeNull();
        expect(leftButton.className).toContain('switcher__button--active');
      });
    });

    describe('pro', () => {
      makeMocks(true);

      test('Pro', () => {
        const {
          container,
          queryByText,
          queryAllByText,
          queryByTestId
        } = renderWithRedux(<Entrypoint />, getState('Pro'), '/exchange/pro');

        expect(container).not.toBeNull();

        expect(queryByText('Exchange')).not.toBeNull();
        expect(queryAllByText('Pro')).toHaveLength(2);

        const rightButton = queryByTestId('switcher-button-right');
        expect(rightButton).not.toBeNull();
        expect(rightButton.className).toContain('switcher__button--active');
      });
    });
  });

  describe('change mode', () => {
    makeMocks();

    test('Light -> Pro', async () => {
      const { container, queryByTestId } = renderWithRedux(
        <Entrypoint />,
        getState('Light'),
        '/exchange/'
      );

      expect(container).not.toBeNull();

      const input = queryByTestId('switcher-input');
      expect(input).not.toBeNull();
    });

    test('Pro -> Light', async () => {
      const { container, queryByTestId } = renderWithRedux(
        <Entrypoint />,
        getState('Light'),
        '/exchange/pro/'
      );

      expect(container).not.toBeNull();

      await wait();
      const input = queryByTestId('switcher-input');
      expect(input).not.toBeNull();

      fireEvent.change(input);
    });
  });

  describe('open exchange from main page', () => {
    describe('when it was light mode', () => {
      let getMock;
      let setMock;

      beforeAll(() => {
        getMock = mockMethod(localStorage, 'get', () => false);
        setMock = mockMethod(localStorage, 'set', () => {});
      });

      afterAll(() => {
        getMock.mockRestore();
        setMock.mockRestore();
      });

      test('should render light mode', () => {
        const { container } = renderWithRedux(
          <Entrypoint />,
          getState('Light'),
          '/exchange/'
        );

        expect(container).not.toBeNull();

        expect(getMock).toBeCalledWith('isProExchangeMode');
        expect(setMock).not.toBeCalled();
      });
    });

    describe('when it was pro mode', () => {
      let getMock;
      let setMock;

      beforeAll(() => {
        getMock = mockMethod(localStorage, 'get', () => true);
        setMock = mockMethod(localStorage, 'set', () => {});
      });

      afterAll(() => {
        getMock.mockRestore();
        setMock.mockRestore();
      });

      test('should render pro mode', () => {
        const { container } = renderWithRedux(
          <Entrypoint />,
          getState('Light'),
          '/exchange/'
        );

        expect(container).not.toBeNull();

        expect(getMock).toBeCalledWith('isProExchangeMode');
        expect(setMock).toBeCalledWith('isProExchangeMode', true);
      });
    });
  });
});
