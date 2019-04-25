import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take
} from 'redux-saga/effects';
import { differenceWith } from 'lodash';

import { getAccountHistory } from 'api/historyApi';
import { accountSelectors } from 'ducks/account';
import { profileActions } from 'ducks/profile';
import { blockchainMetaActions } from 'ducks/blockchain-meta';
import { errorHandlerActions } from 'ducks/errorHandler';
import {
  isOperationTransfer,
  isOperationFillOrder,
  formatInternalOperation,
  addOperationResult,
  isOperationVestingBalanceWithdraw
} from 'formatters/operation';

import selectors from './selectors';
import actions from './actions';

const getAccountIdsToLoad = operations =>
  operations
    .map(op => [op.from, op.to])
    .reduce((res, el) => res.concat(el), [])
    .filter((id, index, arr) => id && index === arr.indexOf(id));

const formatHistory = (history, accountId) =>
  history
    .map(addOperationResult)
    .filter(
      operation =>
        isOperationTransfer(operation) ||
        isOperationFillOrder(operation) ||
        isOperationVestingBalanceWithdraw(operation)
    )
    .map(formatInternalOperation(accountId))
    .reduce((res, el) => res.concat(el), []);

export function* loadHistory() {
  try {
    const accountId = yield select(accountSelectors.accountId);
    const history = yield call(getAccountHistory, { id: accountId });
    const nextHistory = formatHistory(history, accountId);

    yield put(profileActions.loadProfiles(getAccountIdsToLoad(nextHistory)));

    yield put(blockchainMetaActions.loadMeta());

    yield put(actions.loadHistorySuccess(nextHistory));
  } catch (err) {
    yield put(errorHandlerActions.handleNodeError(err));
  }
}

export function* updateHistory() {
  try {
    const accountId = yield select(accountSelectors.accountId);
    const initialLoad = yield select(selectors.initialLoad);

    let prevHistory = yield select(selectors.operations);

    if (initialLoad) {
      yield take(actions.loadHistorySuccess);
      prevHistory = yield select(selectors.operations);
    }

    const nextHistoryResponse = yield call(getAccountHistory, {
      id: accountId
    });

    const nextHistory = formatHistory(nextHistoryResponse, accountId);

    const recentItems = differenceWith(
      nextHistory,
      prevHistory,
      (next, prev) => next.id === prev.id
    );

    if (recentItems.length) {
      yield put(actions.updateHistorySuccess(recentItems));
      yield put(profileActions.loadProfiles(getAccountIdsToLoad(recentItems)));
    }

    yield put(blockchainMetaActions.loadMeta());
  } catch (err) {
    yield put(errorHandlerActions.handleNodeError(err));
  }
}

export function* watch() {
  yield takeEvery(actions.loadHistory, loadHistory);
  yield takeLatest(actions.updateHistory, updateHistory);
}

export default { watch };
