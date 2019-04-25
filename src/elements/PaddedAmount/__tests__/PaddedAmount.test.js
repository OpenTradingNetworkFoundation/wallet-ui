import React from 'react';
import { render } from 'react-testing-library';

import PaddedAmount from '../index';

describe('<PaddedAmount />', () => {
  test('render int', () => {
    const { container, queryByText } = render(
      <PaddedAmount value="1" precision={2} />
    );

    expect(container).not.toBeNull();
    expect(queryByText('1.00')).not.toBeNull();
  });

  test('render float', () => {
    const { container, queryByText } = render(
      <PaddedAmount value="1.1" precision={2} />
    );

    expect(container).not.toBeNull();
    expect(queryByText('1.10')).not.toBeNull();
  });

  test('render float when precision > expected precision', () => {
    const { container, queryByText } = render(
      <PaddedAmount value="1.123" precision={2} />
    );

    expect(container).not.toBeNull();
    expect(queryByText('1.12')).not.toBeNull();
  });
});
