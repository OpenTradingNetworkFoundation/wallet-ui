import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';

import UserAvatar from '../index';

describe('<UserAvatar />', () => {
  afterEach(cleanup);

  test('render', () => {
    const { container, queryByText, queryByTestId } = renderWithRedux(
      <UserAvatar username="username" className="test-class" />
    );

    expect(container).not.toBeNull();

    const svg = queryByTestId('user-avatar-main-menu');
    const div = queryByTestId('user-avatar-container');

    expect(svg.getAttribute('class')).toContain('user-avatar__icon');
    expect(svg.id).toBe('user-avatar-main-menu');

    expect(div).not.toBeNull();

    expect(queryByText('logout.svg')).not.toBeNull();

    expect(queryByText('username')).not.toBeNull();
  });

  test('log out', () => {
    // TODO should be implemented
  });
});
