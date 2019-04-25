import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';
import { getUserAccount } from 'src/__fixtures__/account';
import setUpMocks from 'src/__utils__/setUpMocks';

import { Provider } from 'src/providers/VestingBalances';

import * as env from 'utils/env';
import * as balanceApi from 'api/balanceApi';
import { balances } from 'pages/VestingBalance/__tests__/fixtures';

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
      const { container, queryByTestId } = renderWithRedux(
        <Provider
          value={{
            hasVestingBalances: true
          }}
        >
          <Sidebar />
        </Provider>,
        {
          account: getUserAccount()
        }
      );

      expect(container).not.toBeNull();

      const bigSidebar = queryByTestId('sidebar-container-big');
      expect(bigSidebar).not.toBeNull();
      expect(bigSidebar.className).not.toContain('--hidden');
      expect(bigSidebar.className).not.toContain('--small');

      const smallSidebar = queryByTestId('sidebar-container-small');
      expect(smallSidebar).not.toBeNull();
      expect(smallSidebar.className).toContain('--hidden');
      expect(smallSidebar.className).toContain('--small');
    });

    test('render small', () => {
      const { container, queryByTestId } = renderWithRedux(
        <Provider
          value={{
            hasVestingBalances: true
          }}
        >
          <Sidebar small={true} />
        </Provider>,
        {
          account: getUserAccount()
        }
      );

      expect(container).not.toBeNull();

      const bigSidebar = queryByTestId('sidebar-container-big');
      expect(bigSidebar).not.toBeNull();
      expect(bigSidebar.className).toContain('--hidden');
      expect(bigSidebar.className).not.toContain('--small');

      const smallSidebar = queryByTestId('sidebar-container-small');
      expect(smallSidebar).not.toBeNull();
      expect(smallSidebar.className).not.toContain('--hidden');
      expect(smallSidebar.className).toContain('--small');
    });
  });
});
