import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';
import setUpMocks from 'src/__utils__/setUpMocks';

import { getUserAccount } from 'src/__fixtures__/account';

import * as env from 'utils/env';
import * as balanceApi from 'api/balanceApi';
import { balances } from 'pages/VestingBalance/__tests__/fixtures';
import { Provider } from 'src/providers/VestingBalances';

import Sidebar from '../index';

describe('<Sidebar />', () => {
  afterEach(cleanup);
  setUpMocks(() => [
    mockMethod(env, 'getVersion', () => 'CURRENT_VERSION'),
    mockMethod(balanceApi, 'getVestingBalances', () =>
      Promise.resolve(balances)
    )
  ]);
  describe('render', () => {
    test('render', () => {
      const { container, queryByText } = renderWithRedux(
        <Provider
          value={{
            hasVestingBalances: true
          }}
        >
          <Sidebar accountName="Account Name" id="test-id" />
        </Provider>,
        {
          account: getUserAccount()
        }
      );

      expect(container).not.toBeNull();

      const logoText = queryByText('OTN');
      expect(queryByText('otn-icon.svg')).not.toBeNull();
      expect(logoText).not.toBeNull();
      expect(logoText.className).not.toContain('sidebar__text--small');

      expect(queryByText('wallet.svg')).not.toBeNull();
      expect(queryByText('Wallet')).not.toBeNull();
      expect(queryByText('Store and exchange your assets')).not.toBeNull();
      expect(queryByText('exchange.svg')).not.toBeNull();
      expect(queryByText('Exchange')).not.toBeNull();
      expect(
        queryByText('Fast and reliable exchange of assets')
      ).not.toBeNull();
      expect(queryByText('history.svg')).not.toBeNull();
      expect(queryByText('History')).not.toBeNull();
      expect(queryByText('All operation for all assets')).not.toBeNull();

      expect(queryByText('logout.svg')).not.toBeNull();
      expect(queryByText('Account Name')).not.toBeNull();

      expect(queryByText('external-url.svg')).not.toBeNull();
      expect(queryByText('Feedback')).not.toBeNull();

      expect(queryByText('v. CURRENT_VERSION')).not.toBeNull();
    });

    test('render small', () => {
      const { container, queryByText } = renderWithRedux(
        <Provider
          value={{
            hasVestingBalances: true
          }}
        >
          <Sidebar small={true} accountName="Account Name" id="test-id" />
        </Provider>,
        {
          account: getUserAccount()
        }
      );

      expect(container).not.toBeNull();

      const logoText = queryByText('OTN');
      expect(queryByText('otn-icon.svg')).not.toBeNull();
      expect(logoText).not.toBeNull();
      expect(logoText.className).toContain('sidebar-logo__text--small');

      expect(queryByText('wallet.svg')).not.toBeNull();
      expect(queryByText('Wallet')).toBeNull();
      expect(queryByText('Store and exchange your assets')).toBeNull();
      expect(queryByText('exchange.svg')).not.toBeNull();
      expect(queryByText('Exchange')).toBeNull();
      expect(queryByText('Fast and reliable exchange of assets')).toBeNull();
      expect(queryByText('history.svg')).not.toBeNull();
      expect(queryByText('History')).toBeNull();
      expect(queryByText('All operation for all assets')).toBeNull();

      expect(queryByText('logout.svg')).toBeNull();
      expect(queryByText('Account name')).toBeNull();

      expect(queryByText('external-url.svg')).toBeNull();
      expect(queryByText('feedback-small.svg')).not.toBeNull();
      expect(queryByText('Feedback')).toBeNull();

      expect(queryByText('v. CURRENT_VERSION')).toBeNull();
    });

    test('render hidden', () => {
      const { container, queryByText, queryByTestId } = renderWithRedux(
        <Provider
          value={{
            hasVestingBalances: true
          }}
        >
          <Sidebar accountName="Account Name" hidden={true} id="test-id" />
        </Provider>,
        {
          account: getUserAccount()
        }
      );

      expect(container).not.toBeNull();

      const div = queryByTestId('sidebar-container-test-id');
      expect(div).not.toBeNull();
      expect(div.className).toContain('--hidden');

      const content = queryByTestId('sidebar-content');
      expect(content).not.toBeNull();
      expect(content.className).toContain('--hidden');

      expect(queryByText('Store and exchange your assets').className).toContain(
        '--hidden'
      );
      expect(
        queryByText('Fast and reliable exchange of assets').className
      ).toContain('--hidden');
      expect(queryByText('All operation for all assets').className).toContain(
        '--hidden'
      );

      const logoText = queryByText('OTN');
      expect(queryByText('otn-icon.svg')).not.toBeNull();
      expect(logoText).not.toBeNull();
      expect(logoText.className).not.toContain('sidebar__text--small');

      expect(queryByText('wallet.svg')).not.toBeNull();
      expect(queryByText('Wallet')).not.toBeNull();
      expect(queryByText('Store and exchange your assets')).not.toBeNull();
      expect(queryByText('exchange.svg')).not.toBeNull();
      expect(queryByText('Exchange')).not.toBeNull();
      expect(
        queryByText('Fast and reliable exchange of assets')
      ).not.toBeNull();
      expect(queryByText('history.svg')).not.toBeNull();
      expect(queryByText('History')).not.toBeNull();
      expect(queryByText('All operation for all assets')).not.toBeNull();

      expect(queryByText('logout.svg')).not.toBeNull();
      expect(queryByText('Account Name')).not.toBeNull();

      expect(queryByText('external-url.svg')).not.toBeNull();
      expect(queryByText('Feedback')).not.toBeNull();

      expect(queryByText('v. CURRENT_VERSION')).not.toBeNull();
    });
  });
});
