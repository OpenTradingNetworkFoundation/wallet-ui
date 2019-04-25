import React from 'react';
import { cleanup, render } from 'react-testing-library';

import mouseEvent from 'src/__utils__/mouseEvent';

import HoverContainer from '../index';

describe('<HoverContainer />', () => {
  afterEach(cleanup);

  test('logic', () => {
    const { container, queryByText } = render(
      <HoverContainer>{hover => `Hover is ${hover}`}</HoverContainer>
    );

    expect(container).not.toBeNull();

    expect(queryByText('Hover is false')).not.toBeNull();

    mouseEvent.mouseEnter(queryByText('Hover is false'));
    expect(queryByText('Hover is true')).not.toBeNull();

    mouseEvent.mouseLeave(queryByText('Hover is true'));
    expect(queryByText('Hover is false')).not.toBeNull();
  });
});
