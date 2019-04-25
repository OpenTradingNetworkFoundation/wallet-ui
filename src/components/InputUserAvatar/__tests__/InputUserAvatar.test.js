import React from 'react';
import { cleanup, render } from 'react-testing-library';

import InputUserAvatar from '../index';

describe('<InputUserAvatar />', () => {
  afterEach(cleanup);

  test('render empty input', () => {
    const { container, queryByTestId } = render(
      <InputUserAvatar
        inputProps={{
          value: '',
          error: ''
        }}
        isLoading={false}
      />
    );

    expect(container).not.toBeNull();

    const icon = queryByTestId('image-wrapper');
    const svg = queryByTestId('user-avatar-send');

    expect(icon).not.toBeNull();
    expect(icon.className).toContain('input-user-avatar__image-wrapper--empty');

    expect(svg).toBeNull();
  });

  test('input props passed', () => {
    const { container, queryByPlaceholderText, queryByTestId } = render(
      <InputUserAvatar
        inputProps={{
          value: 'value',
          placeholder: 'placeholder'
        }}
        isLoading={false}
      />
    );

    expect(container).not.toBeNull();
    expect(queryByPlaceholderText('placeholder')).not.toBeNull();

    const input = queryByTestId('input-user-avatar-input');
    expect(input).not.toBeNull();
    expect(input.value).toBe('value');
  });

  test('className added', () => {
    const { container, queryByTestId } = render(
      <InputUserAvatar
        className="test-class"
        inputProps={{
          value: '',
          error: ''
        }}
        isLoading={false}
      />
    );

    const div = queryByTestId('input-user-avatar-container');
    expect(container).not.toBeNull();
    expect(div.className).toContain('test-class');
  });

  test('render loading input', () => {
    const { container, queryByText, queryByTestId } = render(
      <InputUserAvatar
        inputProps={{
          value: 'loading',
          error: ''
        }}
        isLoading={true}
      />
    );

    expect(container).not.toBeNull();

    const icon = queryByTestId('image-wrapper');
    const svg = queryByTestId('user-avatar-send');

    expect(icon).toBeNull();
    expect(svg).toBeNull();
    expect(queryByText('spinner.svg')).not.toBeNull();
  });

  test('render invalid username', () => {
    const { container, queryByText, queryByTestId } = render(
      <InputUserAvatar
        inputProps={{
          value: 'invalid',
          error: 'error'
        }}
        isLoading={false}
      />
    );

    expect(container).not.toBeNull();

    const icon = queryByTestId('image-wrapper');
    const svg = queryByTestId('user-avatar-send');

    expect(icon).not.toBeNull();
    expect(icon.className).not.toContain(
      'input-user-avatar__image-wrapper--empty'
    );

    expect(svg).toBeNull();
    expect(queryByText('error')).not.toBeNull();
  });

  test('render valid username', () => {
    const { container, queryByTestId } = render(
      <InputUserAvatar
        inputProps={{
          value: 'valid',
          error: ''
        }}
        isLoading={false}
      />
    );

    expect(container).not.toBeNull();

    const icon = queryByTestId('image-wrapper');
    const svg = queryByTestId('user-avatar-send');
    const input = queryByTestId('input-user-avatar-input');

    expect(icon).not.toBeNull();
    expect(icon.className).not.toContain(
      'input-user-avatar__image-wrapper--empty'
    );

    expect(svg).not.toBeNull();
    expect(input.value).toBe('valid');
  });
});
