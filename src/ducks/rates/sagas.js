import { takeEvery, select, put } from 'redux-saga/effects';
import { last } from 'ramda';

import { orderBookSelectors, orderBookActions } from 'ducks/order-book';
import AssetAmount from 'src/models/AssetAmount';
import { FOCUSED_INPUT } from 'enums/focusedInput';

import actions from './actions';

function* getPrice({ payload }) {
  const { toAmount = 0 } = payload;
  const { fromAmount, focusedInput } = payload;

  const sell = yield select(orderBookSelectors.invertLimitOrders);
  const assets = yield select(orderBookSelectors.assets);
  const toAsset = assets.quote;

  if (sell.asks.length) {
    const foundOrder = sell.asks.find(order => {
      if (focusedInput === FOCUSED_INPUT.TO_AMOUNT) {
        return order.baseTotal >= +toAmount;
      }

      if (focusedInput === FOCUSED_INPUT.FROM_AMOUNT) {
        return order.quoteTotal >= +fromAmount;
      }

      return order.baseTotal > 0;
    });

    const order = foundOrder || last(sell.asks);
    const delta = 1 * order.price / 100;

    const price =
      order &&
      order.price &&
      AssetAmount.round(+order.price + delta, toAsset.precision);

    yield put(
      actions.updatePrice({
        price,
        isAvailable: true
      })
    );

    yield put(
      actions.updateAvailableAmount({
        availableAmount: AssetAmount.normalize(
          order.baseTotal,
          assets.base.precision
        )
      })
    );
  } else {
    yield put(
      actions.updatePrice({
        isAvailable: false,
        isLoading: false
      })
    );
  }
}

function* watch() {
  yield takeEvery(orderBookActions.limitOrdersSuccess, getPrice);
  yield takeEvery(actions.getPrice, getPrice);
}

export default { watch };
