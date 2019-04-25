import React from 'react';
import {
  cleanup,
  fireEvent,
  waitForElement,
  wait
} from 'react-testing-library';
import { addDays } from 'date-fns';

import { renderWithRedux } from 'src/__utils__';

import OpenOrder from '../index';

const getOrder = (type, expiration) => ({
  base: {
    name: 'OTN',
    displayAmount: '1.2'
  },
  quote: {
    name: 'BTC',
    displayAmount: '2.2'
  },
  type,
  expiration: expiration.replace(/\.+[0-9]+Z$/g, ''),
  percentage: 25,
  price: '0.02'
});

const testOrder = (type, displayType) => {
  const expiration = addDays(new Date(), 101).toISOString();
  const order = getOrder(type, expiration);

  const { container, queryByText, queryAllByText } = renderWithRedux(
    <OpenOrder order={order} />
  );

  expect(container).not.toBeNull();

  expect(queryAllByText(/otn-coin.svg/)).toHaveLength(2);
  expect(queryAllByText(/btc-coin.svg/)).toHaveLength(2);

  expect(queryByText('OTN / BTC')).not.toBeNull();
  expect(queryByText('25 %')).not.toBeNull();

  expect(queryByText('Price')).not.toBeNull();
  expect(queryByText('0.02')).not.toBeNull();

  expect(queryByText('Expiration')).not.toBeNull();
  expect(queryByText('After 100 days')).not.toBeNull();

  expect(queryByText('Direction')).not.toBeNull();
  expect(queryByText(displayType)).not.toBeNull();

  expect(queryByText('Amount')).not.toBeNull();
  expect(queryByText('1.2')).not.toBeNull();

  expect(queryByText('Total')).not.toBeNull();
  expect(queryByText('2.2')).not.toBeNull();
};

describe('<OpenOrder />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('buy order', () => {
      testOrder('BUY', 'Buy');
    });

    test('sell order', () => {
      testOrder('SELL', 'Sell');
    });

    test('expiration is today', () => {
      const expiration = addDays(new Date(), 1).toISOString();
      const order = getOrder('BUY', expiration);

      const { container, queryByText } = renderWithRedux(
        <OpenOrder order={order} />
      );

      expect(container).not.toBeNull();

      expect(queryByText('Expiration')).not.toBeNull();
      expect(queryByText('Today')).not.toBeNull();
    });
  });

  describe('logic', () => {
    test('close order', async () => {
      const order = getOrder('BUY', new Date().toISOString());
      const closeOrder = jest.fn();

      const { container, queryByText } = renderWithRedux(
        <OpenOrder order={order} closeOrder={closeOrder} />
      );

      expect(container).not.toBeNull();
      expect(queryByText('Price')).not.toBeNull();

      fireEvent.click(queryByText('trash.svg'));

      // show close buttons
      expect(queryByText('Price')).toBeNull();
      expect(queryByText('confirm')).not.toBeNull();
      expect(queryByText('Close position?')).not.toBeNull();
      expect(queryByText('close.svg')).not.toBeNull();

      fireEvent.click(queryByText('close.svg'));

      // back to info
      expect(queryByText('Price')).not.toBeNull();
      expect(queryByText('Close position?')).toBeNull();

      fireEvent.click(queryByText('trash.svg'));

      // back to info
      expect(queryByText('Price')).toBeNull();
      expect(queryByText('Close position?')).not.toBeNull();

      // confirm closing
      fireEvent.click(queryByText('confirm'));

      await waitForElement(() => queryByText('spinner.svg'));
      expect(closeOrder).toBeCalledWith(order);
    });

    test('close order with error', async () => {
      const order = getOrder('BUY', new Date().toISOString());
      const closeOrder = jest.fn(
        () => new Promise((resolve, reject) => reject('Err'))
      );

      const { container, queryByText } = renderWithRedux(
        <OpenOrder order={order} closeOrder={closeOrder} />
      );

      expect(container).not.toBeNull();
      expect(queryByText('Price')).not.toBeNull();

      fireEvent.click(queryByText('trash.svg'));

      // show close buttons
      expect(queryByText('Price')).toBeNull();
      expect(queryByText('confirm')).not.toBeNull();
      expect(queryByText('Close position?')).not.toBeNull();
      expect(queryByText('close.svg')).not.toBeNull();

      fireEvent.click(queryByText('close.svg'));

      // back to info
      expect(queryByText('Price')).not.toBeNull();
      expect(queryByText('Close position?')).toBeNull();

      fireEvent.click(queryByText('trash.svg'));

      // back to info
      expect(queryByText('Price')).toBeNull();
      expect(queryByText('Close position?')).not.toBeNull();

      // confirm closing
      fireEvent.click(queryByText('confirm'));

      await waitForElement(() => queryByText('spinner.svg'));
      expect(closeOrder).toBeCalledWith(order);

      await wait();
      expect(queryByText('spinner.svg')).toBeNull();
    });
  });
});
