import { call, takeEvery, put } from 'redux-saga/effects';

import { getOrders } from 'api/ordersApi';
import { limitOrders } from 'src/__fixtures__/limitOrders';

import actions from '../actions';
import { watch, limitOrdersRequest } from '../sagas';

describe('Order book sagas', () => {
  test('limitOrdersRequest', () => {
    const generator = limitOrdersRequest(
      actions.limitOrdersRequest({
        baseId: '1.3.0',
        quoteId: '1.3.1',
        toAmount: '1'
      })
    );

    expect(generator.next().value).toEqual(call(getOrders, '1.3.0', '1.3.1'));
    expect(generator.next(limitOrders).value).toEqual(
      put(
        actions.limitOrdersSuccess({
          baseId: '1.3.0',
          quoteId: '1.3.1',
          limitOrders,
          toAmount: '1'
        })
      )
    );
  });

  test('Order book watcher', () => {
    const generator = watch();
    expect(generator.next().value).toEqual(
      takeEvery(actions.limitOrdersRequest, limitOrdersRequest)
    );
  });
});
