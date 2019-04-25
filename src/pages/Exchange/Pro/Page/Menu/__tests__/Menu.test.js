import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';

import { Provider } from 'src/providers/OpenOrders';
import { ACTIVE_MENU_ITEM } from 'pages/Exchange/Pro/Page/constants/activeMenuItem';

import { renderWithRedux } from 'src/__utils__';

import Menu from '../index';

describe('Menu Pro Interface', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('render with open orders', () => {
      const { container, queryByText } = renderWithRedux(
        <Provider value={{ orderCount: 10 }}>
          <Menu activeMenuItem={ACTIVE_MENU_ITEM.NONE} />
        </Provider>
      );

      expect(container).not.toBeNull();
      expect(queryByText('exchange-mono.svg')).not.toBeNull();
      expect(queryByText('Open Orders')).not.toBeNull();
      expect(queryByText('10')).not.toBeNull();
    });

    test('render without open orders', () => {
      const { container, queryByText } = renderWithRedux(
        <Provider value={{ orderCount: 0 }}>
          <Menu activeMenuItem={ACTIVE_MENU_ITEM.NONE} />
        </Provider>
      );

      expect(container).not.toBeNull();
      expect(queryByText('exchange-mono.svg')).not.toBeNull();
      expect(queryByText('Open Orders')).not.toBeNull();
      expect(queryByText('0')).toBeNull();
    });
  });

  describe('logic', () => {
    test('onClick', () => {
      const fn = jest.fn();

      const { container, queryByTestId } = renderWithRedux(
        <Provider value={{ orderCount: 10 }}>
          <Menu activeMenuItem={ACTIVE_MENU_ITEM.NONE} setActiveMenuItem={fn} />
        </Provider>
      );

      expect(container).not.toBeNull();

      fireEvent.click(queryByTestId('menu-item-orders'));
      expect(fn).toBeCalledWith(ACTIVE_MENU_ITEM.OPEN_POSITIONS);
    });
  });
});
