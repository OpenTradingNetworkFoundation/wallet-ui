import React from 'react';
import { cleanup, render } from 'react-testing-library';

import jdenticon from 'utils/jdenticon';
import cleanMocks from 'src/__utils__/cleanMocks';
import mockMethod from 'src/__utils__/mockMethod';

import JDenticon from '../index';

describe('<JDenticon />', () => {
  afterEach(cleanup);

  test('render', () => {
    const { container, queryByTestId } = render(
      <JDenticon value="test-name" className="test-class" id="test-id" />
    );

    expect(container).not.toBeNull();

    const svg = queryByTestId('test-id');

    expect(svg).not.toBeNull();
    expect(svg.getAttribute('class')).toContain('test-class');
    expect(svg.id).toBe('test-id');
    expect(svg.dataset.jdenticonValue).toBe('test-name');
  });

  describe('update', () => {
    let mock;

    beforeAll(() => {
      mock = mockMethod(jdenticon, 'update', () => {});
    });

    afterAll(() => cleanMocks([mock]));

    it('should call update() on mount', () => {
      render(
        <JDenticon value="test-name" className="test-class" id="test-id" />
      );

      expect(mock).toBeCalledTimes(1);
    });
  });
});
