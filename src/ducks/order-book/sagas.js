import { takeEvery, call, put } from 'redux-saga/effects';

import { getOrders } from 'api/ordersApi';

import actions from './actions';

export function* limitOrdersRequest({
  payload: { baseId, quoteId, toAmount, fromAmount, focusedInput }
}) {
  const limitOrders = yield call(getOrders, baseId, quoteId);
  yield put(
    actions.limitOrdersSuccess({
      baseId,
      quoteId,
      limitOrders,
      toAmount,
      fromAmount,
      focusedInput
    })
  );
}

export function* watch() {
  yield takeEvery(actions.limitOrdersRequest, limitOrdersRequest);
}

export default { watch };
