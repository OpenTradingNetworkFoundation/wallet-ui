import React from 'react';
import { waitForElement, fireEvent, cleanup } from 'react-testing-library';
import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';
import * as marketApi from 'api/marketApi';

import localStorage from 'utils/localStorage';

mockMethod(marketApi, 'tickerVolume', async () => ({
  highest_bid: '10',
  percent_change: '25',
  quote_volume: '100'
}));

import MarketsSelector from '../index';
jest.mock('react-virtualized', () => ({
  ...require.requireActual('react-virtualized'),
  AutoSizer: ({ children }) => children({ width: 100, height: 1000 })
}));
describe('<MarketsList />', () => {
  afterEach(cleanup);
  let getMock, setMock;

  beforeAll(() => {
    getMock = mockMethod(localStorage, 'get', () => []);
    setMock = mockMethod(localStorage, 'set', () => []);
  });

  afterAll(() => {
    getMock.restoreMock();
    setMock.restoreMock();
  });

  test('renders', async () => {
    const handleSelect = jest.fn();
    const { queryByText, queryByTestId } = renderWithRedux(
      <MarketsSelector
        supportedAssets={['OTN', 'ETH', 'BTC']}
        currentlySelectedMarket={{ base: 'OTN', quote: 'ETH' }}
        handleItemSelect={handleSelect}
      />
    );

    await waitForElement(() => queryByText(/25%/i));

    expect(queryByTestId('marketListLabel')).not.toBeNull();
    expect(queryByText('OTN / ETH')).not.toBeNull();
    expect(queryByText('24h Volume')).not.toBeNull();
    expect(queryByText('100 OTN')).not.toBeNull();
    expect(queryByText('24h Change')).not.toBeNull();
    expect(queryByText('+25%')).not.toBeNull();
  });

  test('displays a dropdown list', async () => {
    const handleSelect = jest.fn();
    const { queryByText, queryByTestId } = renderWithRedux(
      <MarketsSelector
        supportedAssets={['OTN', 'ETH', 'BTC']}
        currentlySelectedMarket={{ base: 'OTN', quote: 'ETH' }}
        handleItemSelect={handleSelect}
      />
    );

    await waitForElement(() => queryByText(/25%/i));
    expect(queryByTestId('marketListLabel')).not.toBeNull();

    fireEvent.click(queryByTestId('marketListLabel'));

    expect(queryByTestId('marketsListSelectorContainer')).not.toBeNull();
    expect(queryByTestId('marketsListSelectorContainer').children.length).toBe(
      1
    );
  });

  test('lets user select an item from dropdown list', async () => {
    const handleSelect = jest.fn();
    const { queryByText, queryByTestId } = renderWithRedux(
      <MarketsSelector
        supportedAssets={['OTN', 'ETH', 'BTC']}
        currentlySelectedMarket={{ base: 'OTN', quote: 'ETH' }}
        handleItemSelect={handleSelect}
      />
    );

    await waitForElement(() => queryByText(/25%/i));
    expect(queryByTestId('marketListLabel')).not.toBeNull();

    fireEvent.click(queryByTestId('marketListLabel'));

    fireEvent.click(queryByText('OTN / BTC'));
    expect(handleSelect).toHaveBeenCalledWith({
      base: 'OTN',
      quote: 'BTC',
      favorite: false
    });
  });
});
