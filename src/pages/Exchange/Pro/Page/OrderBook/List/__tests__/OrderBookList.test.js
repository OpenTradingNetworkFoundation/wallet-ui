import React from 'react';
import { fireEvent } from 'react-testing-library';

import { DISPLAY_CURRENCY } from 'pages/Exchange/Pro/Page/constants/displayCurrency';
import { renderWithRedux } from 'src/__utils__';

import OrderBookList from '../index';
const selectOrder = jest.fn();
const testRender = (orders, type) => {
  const { container, queryByText } = renderWithRedux(
    <OrderBookList
      orders={orders}
      type={type}
      selectOrder={selectOrder}
      totalCurrency={DISPLAY_CURRENCY.BASE}
    />
  );

  expect(container).not.toBeNull();
  expect(queryByText('1base')).not.toBeNull();
  expect(queryByText('1quote')).not.toBeNull();
  expect(queryByText('1.000000')).not.toBeNull();

  expect(queryByText('2base')).not.toBeNull();
  expect(queryByText('2quote')).not.toBeNull();
  expect(queryByText('2.123000')).not.toBeNull();
};

describe('a <OrderBookList />', () => {
  describe('when empty orders', () => {
    test('asks', () => {
      const { container, queryByText } = renderWithRedux(
        <OrderBookList orders={[]} type="ASKS" />
      );

      expect(container).not.toBeNull();

      expect(queryByText('There are no sell orders')).not.toBeNull();
    });

    test('bids', () => {
      const { container, queryByText } = renderWithRedux(
        <OrderBookList orders={[]} type="BIDS" />
      );

      expect(container).not.toBeNull();

      expect(queryByText('There are no buy orders')).not.toBeNull();
    });
  });

  describe('when not empty orders', () => {
    const orders = [
      {
        price: '1',
        base: '1base',
        quote: '1quote',
        baseTotal: '1base'
      },
      {
        price: '2.123',
        base: '2base',
        quote: '2quote',
        baseTotal: '2base'
      }
    ];

    test('render order list with ASKS', () => {
      testRender(orders, 'ASKS');
    });

    test('render order list with BIDS', () => {
      testRender(orders, 'BIDS');
    });

    test('render with totalCurrency displaying base', () => {
      const orders = [
        {
          price: '1',
          base: '1base',
          quote: '1quote',
          baseTotal: '1base'
        },
        {
          price: '2.123',
          base: '2base',
          quote: '2quote',
          baseTotal: '2base'
        }
      ];

      const { container, queryByText } = renderWithRedux(
        <OrderBookList
          orders={orders}
          type={'ASKS'}
          selectOrder={selectOrder}
          totalCurrency={DISPLAY_CURRENCY.BASE}
        />
      );

      expect(container).not.toBeNull();
      expect(queryByText('1base')).not.toBeNull();

      expect(queryByText('2base')).not.toBeNull();
    });

    test('render with totalCurrency displaying quote', () => {
      const orders = [
        {
          price: '1',
          base: '1base',
          quote: '1quote',
          baseTotal: '1base'
        },
        {
          price: '2.123',
          base: '2base',
          quote: '2quote',
          baseTotal: '2base'
        }
      ];

      const { container, queryByText } = renderWithRedux(
        <OrderBookList
          orders={orders}
          type={'ASKS'}
          selectOrder={selectOrder}
          totalCurrency={DISPLAY_CURRENCY.QUOTE}
        />
      );

      expect(container).not.toBeNull();
      expect(queryByText('1quote')).not.toBeNull();

      expect(queryByText('2quote')).not.toBeNull();
    });
  });

  describe('when clicking on order', () => {
    test('should call a method', () => {
      const orders = [
        {
          price: '1',
          base: '1base',
          quote: '1quote',
          baseTotal: '1base'
        },
        {
          price: '2.123',
          base: '2base',
          quote: '2quote',
          baseTotal: '2base'
        }
      ];
      const { queryByText } = renderWithRedux(
        <OrderBookList
          orders={orders}
          type="BIDS"
          selectOrder={selectOrder}
          totalCurrency={DISPLAY_CURRENCY.BASE}
        />
      );

      const order = queryByText('1base');
      fireEvent.click(order);
      expect(selectOrder).toHaveBeenCalledWith({
        price: '1',
        base: '1base',
        quote: '1quote',
        baseTotal: '1base'
      });
    });
  });
});
