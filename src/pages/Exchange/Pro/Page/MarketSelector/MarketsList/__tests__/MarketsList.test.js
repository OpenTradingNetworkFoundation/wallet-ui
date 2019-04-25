import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';

import MarketsList from '../index';

describe('<MarketsList />', () => {
  afterEach(cleanup);
  test('renders', () => {
    const { container, getByPlaceholderText, getByTestId } = renderWithRedux(
      <MarketsList
        options={[{ base: 'OTN', quote: 'ETH' }, { base: 'OTN', quote: 'BTC' }]}
      >
        {options => (
          <ul data-testid="marketsList">
            {options.map(({ base, quote }) => (
              <li key={base + quote}>
                {base}/{quote}
              </li>
            ))}
          </ul>
        )}
      </MarketsList>
    );

    expect(container).not.toBeNull();

    expect(getByPlaceholderText(/Search by asset/i)).not.toBeNull();
    expect(document.activeElement).toBe(
      getByPlaceholderText(/Search by asset/i)
    );

    expect(getByTestId('marketsList').children.length).toBe(2);
  });

  test('filters data based on search value', () => {
    const { getByPlaceholderText, getByTestId, queryByText } = renderWithRedux(
      <MarketsList
        options={[{ base: 'OTN', quote: 'ETH' }, { base: 'OTN', quote: 'BTC' }]}
      >
        {options => (
          <ul data-testid="marketsList">
            {options.map(({ base, quote }) => (
              <li key={base + quote}>
                {base}/{quote}
              </li>
            ))}
          </ul>
        )}
      </MarketsList>
    );

    const searchInput = getByPlaceholderText(/search by/i);
    searchInput.value = 'ETH';
    fireEvent.change(searchInput);

    expect(getByTestId('marketsList').children.length).toBe(1);
    expect(queryByText(/btc/i)).toBeNull();
    expect(queryByText(/eth/i)).not.toBeNull();
  });

  test('displays a placeholder', () => {
    const {
      getByPlaceholderText,
      queryByTestId,
      queryByText
    } = renderWithRedux(
      <MarketsList
        options={[{ base: 'OTN', quote: 'ETH' }, { base: 'OTN', quote: 'BTC' }]}
      >
        {options => (
          <ul data-testid="marketsList">
            {options.map(({ base, quote }) => (
              <li key={base + quote}>
                {base}/{quote}
              </li>
            ))}
          </ul>
        )}
      </MarketsList>
    );
    const searchInput = getByPlaceholderText(/search by/i);
    searchInput.value = 'boroda';
    fireEvent.change(searchInput);
    expect(queryByTestId('marketsList')).toBeNull();
    expect(queryByText(/no markets/i)).not.toBeNull();
  });
});
