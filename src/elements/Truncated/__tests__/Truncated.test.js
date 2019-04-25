import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Truncated from '../index';

describe('<Truncated />', () => {
  afterEach(cleanup);

  test('long value', () => {
    const { container, queryByText } = render(
      <Truncated value="test long value" maxLength={10}>
        {(truncated, isTruncated) => `${truncated} - ${isTruncated}`}
      </Truncated>
    );

    expect(container).not.toBeNull();
    expect(queryByText('test lo... - true')).not.toBeNull();
  });

  test('short value', () => {
    const { container, queryByText } = render(
      <Truncated value="test value" maxLength={10}>
        {(truncated, isTruncated) => `${truncated} - ${isTruncated}`}
      </Truncated>
    );

    expect(container).not.toBeNull();
    expect(queryByText('test value - false')).not.toBeNull();
  });

  test('custom tail', () => {
    const { container, queryByText } = render(
      <Truncated tail="!!!" value="test long value" maxLength={10}>
        {(truncated, isTruncated) => `${truncated} - ${isTruncated}`}
      </Truncated>
    );

    expect(container).not.toBeNull();
    expect(queryByText('test lo!!! - true')).not.toBeNull();
  });
});
