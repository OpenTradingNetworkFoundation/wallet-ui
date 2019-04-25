import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';

import AuthService from 'services/authService';
import { renderWithRedux } from 'src/__utils__';
import * as accountApi from 'src/api/accountApi';

import LoginPage from '../index';

const mocks = [
  jest.spyOn(accountApi, 'getAccountByName').mockImplementation(name => {
    if (name === 'passing name')
      return {
        id: 1,
        name: 'passing name'
      };

    if (name === 'passing name with password') {
      return {
        id: 2,
        name: 'passing name with password',
        token: 'token'
      };
    } else return null;
  }),
  jest
    .spyOn(AuthService, 'authenticate')
    .mockImplementation((account, password) => {
      return account && account.name === 'passing name with password'
        ? password
        : null;
    }),
  jest.spyOn(AuthService, 'setAuthName').mockImplementation(() => {})
];

describe('<LoginPage />', () => {
  afterEach(cleanup);
  afterAll(() => mocks.forEach(mock => mock.mockRestore()));

  test('renders', () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(<LoginPage />);

    expect(getByText(/otn wallet/i)).not.toBeNull();
    expect(getByText(/otn-icon/i)).not.toBeNull();
    expect(getByText(/sign up/i)).not.toBeNull();
    expect(getByText(/login/i)).not.toBeNull();

    expect(getByPlaceholderText(/login/i)).not.toBeNull();
    expect(getByPlaceholderText(/password/i)).not.toBeNull();
  });

  test('renders with empty values', () => {
    const { getByPlaceholderText } = renderWithRedux(<LoginPage />);

    expect(getByPlaceholderText(/login/i).value).toBe('');
    expect(getByPlaceholderText(/password/i).value).toBe('');
  });

  test('renders with preset account name', () => {
    const { getByPlaceholderText, history } = renderWithRedux(<LoginPage />);
    history.push('/login?accountName=valya-123');

    expect(getByPlaceholderText(/login/i).value).toBe('valya-123');
  });

  test('doesnt allow to login only when fields are set', () => {
    const {
      getByPlaceholderText,
      getByText,
      queryByText,
      history
    } = renderWithRedux(<LoginPage />);
    history.push('/login?accountName=random_name');

    const loginButton = getByText(/login/i);
    fireEvent.click(loginButton);

    expect(AuthService.authenticate).not.toHaveBeenCalled();

    const loginInput = getByPlaceholderText(/login/i);
    fireEvent.change(loginInput);

    fireEvent.click(loginButton);
    expect(AuthService.authenticate).not.toHaveBeenCalled();

    const passwordInput = getByPlaceholderText(/password/i);
    passwordInput.value = 'passwuurd';
    fireEvent.change(passwordInput);

    fireEvent.click(loginButton);
    expect(AuthService.authenticate).not.toHaveBeenCalled();
    expect(getByText(/account doesn't exist/i)).not.toBeNull();

    loginInput.value = 'passing name';
    fireEvent.change(loginInput);

    fireEvent.click(loginButton);

    expect(AuthService.authenticate).toHaveBeenCalledWith(
      { id: 1, name: 'passing name' },
      'passwuurd'
    );

    expect(getByText(/password is incorrect/i)).not.toBeNull();

    loginInput.value = 'passing name with password';
    fireEvent.change(loginInput);

    passwordInput.value = 'password';
    fireEvent.change(passwordInput);
    fireEvent.click(loginButton);

    expect(AuthService.authenticate).toHaveBeenCalledWith(
      { id: 2, name: 'passing name with password', token: 'token' },
      'password'
    );

    expect(queryByText(/password is incorrect/i)).toBeNull();
  });
});
