import React from 'react';
import { render, cleanup } from 'react-testing-library';

import mockMethod from 'src/__utils__/mockMethod';
import cleanMocks from 'src/__utils__/cleanMocks';

import * as screenParams from 'utils/screenParams';

import ScreenSizeProvider from '../index';

const mocks = [
  mockMethod(screenParams, 'getScreenParams', () => ({ width: 1, height: 1 }))
];

describe('<ScreenSizeProvider />', () => {
  afterEach(cleanup);
  afterAll(() => cleanMocks(mocks));

  test('render', () => {
    const { container, queryByText } = render(
      <ScreenSizeProvider>
        <ScreenSizeProvider.Consumer>
          {({ isSmall }) => `small is ${isSmall}`}
        </ScreenSizeProvider.Consumer>
      </ScreenSizeProvider>
    );

    expect(container).not.toBeNull();
    expect(queryByText('small is true')).not.toBeNull();

    mocks.push(
      mockMethod(screenParams, 'getScreenParams', () => ({
        width: 1000,
        height: 1000
      }))
    );
    window.dispatchEvent(new Event('resize'));

    expect(queryByText('small is false')).not.toBeNull();
  });
});
