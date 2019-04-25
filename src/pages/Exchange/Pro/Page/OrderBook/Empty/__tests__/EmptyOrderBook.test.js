import React from 'react';

import { renderWithRedux } from 'src/__utils__';

import EmptyOrderBook from '../index';

describe('a <EmptyOrderBook />', () => {
  test('render sell orders', () => {
    const { container, queryByText } = renderWithRedux(
      <EmptyOrderBook type="ASKS" />
    );

    expect(container).not.toBeNull();

    expect(queryByText('empty-order-book.svg')).not.toBeNull();
    expect(queryByText('There are no sell orders')).not.toBeNull();
  });

  test('render buy orders', () => {
    const { container, queryByText } = renderWithRedux(
      <EmptyOrderBook type="BIDS" />
    );

    expect(container).not.toBeNull();

    expect(queryByText('empty-order-book.svg')).not.toBeNull();
    expect(queryByText('There are no buy orders')).not.toBeNull();
  });
});
