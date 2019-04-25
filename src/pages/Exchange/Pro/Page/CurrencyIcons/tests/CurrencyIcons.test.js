import React from 'react';
import { render, cleanup } from 'react-testing-library';

import CurrencyIcons from '../index';

describe('<CurrencyIcons />', () => {
  afterEach(cleanup);

  test('render', () => {
    const { queryByText, container } = render(
      <CurrencyIcons base="OTN" quote="BTC" />
    );

    expect(container).not.toBeNull();
    expect(queryByText(/otn-coin.svg/)).not.toBeNull();
    expect(queryByText(/btc-coin.svg/)).not.toBeNull();
  });
});
