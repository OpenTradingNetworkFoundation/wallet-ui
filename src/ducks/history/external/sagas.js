import {
  put,
  select,
  call,
  takeLatest,
  take,
  cancel
} from 'redux-saga/effects';
import { getOperations } from 'api/gatewayApi';
import { accountSelectors } from 'ducks/account';
import { formatExternalOperation } from 'formatters/operation';
import { errorHandlerActions } from 'ducks/errorHandler';
import { serviceStatusActions } from 'ducks/serviceStatus';

import actions from './actions';

export function* loadHistory() {
  try {
    const accountId = yield select(accountSelectors.accountPlainId);

    const nextOperationsResult = yield call(getOperations, accountId);
    const nextOperations = nextOperationsResult.map(formatExternalOperation);

    if (nextOperations.length) {
      yield put(actions.loadHistorySuccess({ operations: nextOperations }));
    }
  } catch (error) {
    yield put(errorHandlerActions.handleGatewayError(error));
  }
}

export function* watch() {
  while (true) {
    yield take(serviceStatusActions.gatewayIsActive);
    const loadingTask = yield takeLatest(actions.loadHistory, loadHistory);
    yield take(serviceStatusActions.gatewayIsDown);
    yield cancel(loadingTask);
  }
}

export default { watch };
