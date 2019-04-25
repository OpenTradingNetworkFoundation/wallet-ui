import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';
import { getUserAccount } from 'src/__fixtures__/account';
import setUpMocks from 'src/__utils__/setUpMocks';

import { Provider } from 'src/providers/VestingBalances';

import * as balanceApi from 'api/balanceApi';
import { balances } from 'pages/VestingBalance/__tests__/fixtures';

import NavigationBar from '../index';

describe('<NavigationBar />', () => {
  afterEach(cleanup);
  setUpMocks(() =>
    mockMethod(balanceApi, 'getVestingBalances', () =>
      Promise.resolve(balances)
    )
  );
  test('render', () => {
    const { container, history, queryByText } = renderWithRedux(
      <Provider
        value={{
          hasVestingBalances: true
        }}
      >
        <NavigationBar />
      </Provider>,
      { account: getUserAccount() }
    );
    history.push('/wallet/');

    expect(container).not.toBeNull();

    expect(queryByText('wallet.svg')).not.toBeNull();
    expect(queryByText('Wallet')).not.toBeNull();
    expect(queryByText('Store and exchange your assets')).not.toBeNull();

    expect(queryByText('exchange.svg')).not.toBeNull();
    expect(queryByText('Exchange')).not.toBeNull();
    expect(queryByText('Fast and reliable exchange of assets')).not.toBeNull();

    expect(queryByText('history.svg')).not.toBeNull();
    expect(queryByText('History')).not.toBeNull();
    expect(queryByText('All operation for all assets')).not.toBeNull();

    expect(queryByText('vesting.svg')).not.toBeNull();
    expect(queryByText('Vesting balance')).not.toBeNull();
    expect(queryByText('All vesting balances for your account')).not.toBeNull();
  });

  test('render small', () => {
    const { container, history, queryByText } = renderWithRedux(
      <Provider
        value={{
          hasVestingBalances: true
        }}
      >
        <NavigationBar small={true} />
      </Provider>,
      { account: getUserAccount() }
    );
    history.push('/wallet/');

    expect(container).not.toBeNull();

    expect(queryByText('wallet.svg')).not.toBeNull();
    expect(queryByText('Wallet')).toBeNull();
    expect(queryByText('Store and exchange your assets')).toBeNull();

    expect(queryByText('exchange.svg')).not.toBeNull();
    expect(queryByText('Exchange')).toBeNull();
    expect(queryByText('Fast and reliable exchange of assets')).toBeNull();

    expect(queryByText('history.svg')).not.toBeNull();
    expect(queryByText('History')).toBeNull();
    expect(queryByText('All operation for all assets')).toBeNull();
  });

  test('render hidden', () => {
    const { container, history, queryByText } = renderWithRedux(
      <Provider
        value={{
          hasVestingBalances: true
        }}
      >
        <NavigationBar hidden={true} />
      </Provider>,
      { account: getUserAccount() }
    );
    history.push('/wallet/');

    expect(container).not.toBeNull();

    expect(queryByText('Store and exchange your assets').className).toContain(
      '--hidden'
    );
    expect(
      queryByText('Fast and reliable exchange of assets').className
    ).toContain('--hidden');
    expect(queryByText('All operation for all assets').className).toContain(
      '--hidden'
    );
  });

  test('navigation', () => {
    const { container, history, queryByText } = renderWithRedux(
      <Provider
        value={{
          hasVestingBalances: true
        }}
      >
        <NavigationBar />
      </Provider>,
      { account: getUserAccount() }
    );
    history.push('/wallet/');

    expect(container).not.toBeNull();

    fireEvent.click(queryByText('exchange.svg'));
    expect(history.location.pathname).toBe('/exchange');

    fireEvent.click(queryByText('history.svg'));
    expect(history.location.pathname).toBe('/history');

    fireEvent.click(queryByText('wallet.svg'));
    expect(history.location.pathname).toBe('/wallet');
  });

  test('className', () => {
    const { container, history, queryByTestId } = renderWithRedux(
      <Provider
        value={{
          hasVestingBalances: true
        }}
      >
        <NavigationBar className="test-class" />
      </Provider>,
      { account: getUserAccount() }
    );
    history.push('/wallet/');

    expect(container).not.toBeNull();

    const div = queryByTestId('navigation-bar-container');
    expect(div.className).toContain('test-class');
  });
});
