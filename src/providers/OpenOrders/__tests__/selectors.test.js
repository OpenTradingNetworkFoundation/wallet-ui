import { orders, orderCount } from '../selectors';

import { plainOrders, balancesMap, formattedOrders } from './fixtures';

describe('OpenOrders selectors', () => {
  test('orders', () => {
    const state = {
      orders: plainOrders
    };

    expect(orders(state, balancesMap)).toEqual(formattedOrders);
  });

  test('orderCount', () => {
    const state = {
      orders: [1, 2, 3]
    };

    expect(orderCount(state)).toBe(3);
  });
});
