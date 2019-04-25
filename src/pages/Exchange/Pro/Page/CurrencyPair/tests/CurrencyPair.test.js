import React from 'react';
import { render, cleanup } from 'react-testing-library';

import CurrencyPair from '../index';

describe('<CurrencyPair />', () => {
  afterEach(cleanup);

  test('render', () => {
    const { queryByText, container } = render(
      <CurrencyPair base="OTN" quote="BTC" />
    );

    expect(container).not.toBeNull();
    expect(queryByText(/otn-coin.svg/)).not.toBeNull();
    expect(queryByText(/btc-coin.svg/)).not.toBeNull();
    expect(queryByText('OTN / BTC')).not.toBeNull();
  });
});
