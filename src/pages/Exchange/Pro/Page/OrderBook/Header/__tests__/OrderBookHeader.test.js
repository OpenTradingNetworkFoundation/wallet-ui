import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import { DISPLAY_CURRENCY } from 'pages/Exchange/Pro/Page/constants/displayCurrency';

import OrderBookHeader from '../index';

describe('a <OrderBookHeader />', () => {
  afterEach(cleanup);
  test('render', () => {
    const { container, queryByText, queryAllByText } = renderWithRedux(
      <OrderBookHeader base="BASE" totalCurrency={DISPLAY_CURRENCY.BASE} />
    );

    expect(container).not.toBeNull();

    expect(queryByText('Price')).not.toBeNull();
    expect(queryAllByText(/(BASE)/i)).toHaveLength(4);

    expect(queryAllByText(/Total/i)).toHaveLength(2);
    expect(queryAllByText(/Amount/i)).toHaveLength(2);
  });

  test('render with totalCurrency', () => {
    const { container, queryAllByText } = renderWithRedux(
      <OrderBookHeader
        base="BASE"
        quote="QUOTE"
        totalCurrency={DISPLAY_CURRENCY.QUOTE}
      />
    );

    expect(container).not.toBeNull();
    expect(queryAllByText(/(BASE)/i)).toHaveLength(2);
    expect(queryAllByText(/(QUOTE)/i)).toHaveLength(2);

    expect(queryAllByText(/Total/i)).toHaveLength(2);
    expect(queryAllByText(/Amount/i)).toHaveLength(2);
  });
});
