import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';

import Switcher from '../index';

describe('<Switcher />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('Light mode', () => {
      const onChange = jest.fn();

      const { container, queryByText, queryByTestId } = renderWithRedux(
        <Switcher onChange={onChange} active={false} />
      );

      expect(container).not.toBeNull();

      const light = queryByText('Light');
      const pro = queryByText('Pro');
      const selector = queryByTestId('switcher-selector');

      expect(light).not.toBeNull();
      expect(pro).not.toBeNull();
      expect(selector).not.toBeNull();

      expect(light.className).toEqual(
        'switcher__button switcher__button--left switcher__button--active'
      );
      expect(pro.className).toEqual('switcher__button switcher__button--right');
      expect(selector.className).toEqual('switcher__selector');
    });

    test('Pro mode', () => {
      const onChange = jest.fn();

      const { container, queryByText, queryByTestId } = renderWithRedux(
        <Switcher onChange={onChange} active={true} />
      );

      expect(container).not.toBeNull();

      const light = queryByText('Light');
      const pro = queryByText('Pro');
      const selector = queryByTestId('switcher-selector');

      expect(light).not.toBeNull();
      expect(pro).not.toBeNull();
      expect(selector).not.toBeNull();

      expect(light.className).toEqual(
        'switcher__button switcher__button--left'
      );
      expect(pro.className).toEqual(
        'switcher__button switcher__button--right switcher__button--active'
      );
      expect(selector.className).toEqual(
        'switcher__selector switcher__selector--right'
      );
    });
  });

  describe('on click', () => {
    test('Light', () => {
      const onChange = jest.fn();

      const { container, queryByTestId } = renderWithRedux(
        <Switcher onChange={onChange} active={false} />
      );

      expect(container).not.toBeNull();

      const input = queryByTestId('switcher-input');

      expect(input).not.toBeNull();

      fireEvent.change(input);

      expect(onChange).toBeCalledWith(true);
    });

    test('Pro', () => {
      const onChange = jest.fn();

      const { container, queryByTestId } = renderWithRedux(
        <Switcher onChange={onChange} active={true} />
      );

      expect(container).not.toBeNull();

      const input = queryByTestId('switcher-input');

      expect(input).not.toBeNull();

      fireEvent.change(input);

      expect(onChange).toBeCalledWith(false);
    });
  });

  describe('className and mods', () => {
    test('it should render with mods', () => {
      const onChange = jest.fn();

      const { container, queryByText, queryByTestId } = renderWithRedux(
        <Switcher onChange={onChange} active={true} mods={{ dark: true }} />
      );

      expect(container).not.toBeNull();

      const light = queryByText('Light');
      const pro = queryByText('Pro');
      const selector = queryByTestId('switcher-selector');
      const label = queryByTestId('switcher-label');

      expect(light).not.toBeNull();
      expect(pro).not.toBeNull();
      expect(selector).not.toBeNull();

      expect(light.className).toEqual(
        'switcher__button switcher__button--left'
      );
      expect(pro.className).toEqual(
        'switcher__button switcher__button--right switcher__button--active'
      );
      expect(selector.className).toEqual(
        'switcher__selector switcher__selector--dark switcher__selector--right'
      );

      expect(label).not.toBeNull();
    });

    test('it should render with className', () => {
      const onChange = jest.fn();

      const { container, queryByTestId } = renderWithRedux(
        <Switcher
          onChange={onChange}
          active={true}
          className={'test-class-name'}
        />
      );

      expect(container).not.toBeNull();

      const label = queryByTestId('switcher-label');

      expect(label).not.toBeNull();
      expect(label.className).toEqual('switcher test-class-name');
    });
  });
});
