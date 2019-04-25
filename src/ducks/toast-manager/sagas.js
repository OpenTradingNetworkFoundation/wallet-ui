import { put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { toastActions } from 'ducks/toast';
import { balanceActions } from 'ducks/balance';
import { exchangeFundsActions } from 'ducks/exchange-funds';
import { internalHistoryActions } from 'ducks/history/internal';
import { errorHandlerActions } from 'ducks/errorHandler';

import localizer from 'utils/localizer';
import { operationTitle } from 'formatters/operation';

import { TYPE } from 'enums/toast';
import { INTERNAL_TYPE } from 'enums/operation';

function* handleLoadBalanceFail({ payload }) {
  if (
    payload.message !== 'connection closed' &&
    payload.message !== 'websocket state error:0'
  ) {
    yield put(
      toastActions.itemCreate({
        type: TYPE.ERROR,
        payload: {
          title: localizer.getValue('errors.balance.title'),
          message: localizer.getValue('errors.balance.message')
        }
      })
    );
  }
}

function* handleExchangeFundsFail({ payload }) {
  if (payload.message.includes('fill_or_kill')) {
    yield put(
      toastActions.itemCreate({
        type: TYPE.ERROR,
        payload: {
          title: localizer.getValue('errors.exchange.fillOrKill.title'),
          message: localizer.getValue('errors.exchange.fillOrKill.message')
        }
      })
    );
  } else {
    yield put(
      toastActions.itemCreate({
        type: TYPE.ERROR,
        payload: {
          title: localizer.getValue('errors.exchange.generic.title'),
          message: localizer.getValue('errors.exchange.generic.message')
        }
      })
    );
  }
}

function* handleGenericError() {
  yield put(
    toastActions.itemCreate({
      type: TYPE.ERROR,
      payload: {
        title: localizer.getValue('errors.generic.title'),
        message: localizer.getValue('errors.generic.message')
      }
    })
  );
}

function* handleGatewayError() {
  yield put(
    toastActions.itemCreate({
      type: TYPE.ERROR,
      payload: {
        title: localizer.getValue('errors.gateway.title'),
        message: localizer.getValue('errors.gateway.message')
      }
    })
  );
}

function* handleNodeError() {
  yield put(
    toastActions.itemCreate({
      type: TYPE.ERROR,
      payload: {
        title: localizer.getValue('errors.generic.title'),
        message: localizer.getValue('errors.generic.message')
      }
    })
  );
}

function* handleUpdateHistory({ payload }) {
  const nextHistory = payload;
  const history = nextHistory.reduce((acc, operation) => {
    const orderId = operation.orderId;
    return {
      ...acc,
      [orderId]: (acc[orderId] || []).concat(operation)
    };
  }, {});

  const initialNotification = {
    title: '',
    body: {
      pays: { amount: 0, assetId: '' },
      receives: { amount: 0, assetId: '' }
    }
  };

  const notifications = Object.keys(history).map(orderId =>
    history[orderId].reduce((notification, operation) => {
      if (operation.internalType === INTERNAL_TYPE.EXCHANGE) {
        return {
          ...notification,
          title: operationTitle(operation),
          body: {
            pays: {
              amount: +notification.body.pays.amount + +operation.pays.amount,
              assetId: operation.pays.asset_id
            },
            receives: {
              amount:
                +notification.body.receives.amount + +operation.receives.amount,
              assetId: operation.receives.asset_id
            }
          }
        };
      } else {
        return {
          title: operationTitle(operation),
          body: {
            assetId: operation.amount.assetId,
            amount: operation.amount.amount
          }
        };
      }
    }, initialNotification)
  );

  yield all(
    notifications.map(operation =>
      put(
        toastActions.itemCreate({
          type: TYPE.SUCCESS,
          payload: operation
        })
      )
    )
  );
}

function* watch() {
  yield takeEvery(balanceActions.loadBalanceFail, handleLoadBalanceFail);
  yield takeEvery(
    exchangeFundsActions.exchangeFundsFail,
    handleExchangeFundsFail
  );
  yield takeEvery(
    internalHistoryActions.updateHistorySuccess,
    handleUpdateHistory
  );
  yield takeEvery(errorHandlerActions.genericError, handleGenericError);
  yield takeLatest(errorHandlerActions.gatewayError, handleGatewayError);
  yield takeEvery(errorHandlerActions.nodeError, handleNodeError);
}

export default { watch };
