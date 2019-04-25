import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import ProDropdown from '../index';

describe('a <ProDropdown />', () => {
  test('render', async () => {
    const onChange = jest.fn();
    const value = { id: 'first' };

    const values = [{ id: 'first' }, { id: 'second' }];

    const { container, queryByText } = render(
      <ProDropdown onChange={onChange} value={value} options={values} />
    );

    expect(container).not.toBeNull();

    expect(queryByText('arrow-down.svg')).not.toBeNull();

    const item = queryByText('first');
    expect(item).not.toBeNull();

    fireEvent.mouseDown(item);
    fireEvent.click(queryByText('second'));

    expect(queryByText('second')).toBeNull(); // dropdown closed
    expect(onChange).toBeCalledWith({ id: 'second' });
  });
});
