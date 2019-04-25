import React from 'react';
import { waitForElement, cleanup } from 'react-testing-library';
import { compose } from 'ramda';

import { renderWithRedux } from 'src/__utils__';

import mockMethod from 'src/__utils__/mockMethod';
import setUpMocks from 'src/__utils__/setUpMocks';

import { getUserAccount } from 'src/__fixtures__/account';
import { getAssets } from 'src/__fixtures__/assets';

import * as helpers from 'src/providers/VestingBalances/helpers';
import { Provider } from 'src/providers/VestingBalances';

import { formatVestingBalances } from 'src/providers/VestingBalances/formatters';
import { filterEmptyAmount } from 'src/providers/VestingBalances/filterEmptyAmount';

import VestingBalance from '../index';

import { balances } from './fixtures';

describe('<VestingBalance />', () => {
  setUpMocks(() => [
    mockMethod(helpers, 'getUTCDate', () => new Date(2018, 10, 24, 19, 30, 10))
  ]);
  afterEach(cleanup);
  test('renders', async () => {
    const { queryByText, queryAllByText } = renderWithRedux(
      <Provider
        value={{
          balances: compose(formatVestingBalances, filterEmptyAmount)(balances),
          withdrawBalance: () => {}
        }}
      >
        <VestingBalance />
      </Provider>,
      {
        account: getUserAccount(),
        balance: { assets: getAssets() },
        auth: {
          token: { token: 'token' }
        }
      }
    );
    await waitForElement(() => queryByText('1 OTN'));

    // CDD
    expect(queryAllByText('Coin seconds earned').length).toBe(3);
    expect(queryAllByText('Coin seconds required').length).toBe(3);
    expect(queryAllByText('days').length).toBe(12);

    // Linear
    expect(queryAllByText('Vesting cliff').length).toBe(3);
    expect(queryAllByText('Vesting period').length).toBe(3);
    expect(queryByText('20.10.2018')).not.toBeNull();
    expect(queryByText('22.10.2018')).not.toBeNull();
    expect(queryByText('473.16666667 OTN')).not.toBeNull();
    expect(queryByText('708.78697909 OTN')).not.toBeNull();

    expect(queryAllByText('Begin date').length).toBe(6);
    expect(queryAllByText('Available to withdraw').length).toBe(6);
    expect(queryAllByText('Withdraw').length).toBe(6);
  });
});
