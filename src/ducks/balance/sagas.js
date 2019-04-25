import { call, put, takeEvery, select, take } from 'redux-saga/effects';

import { getBalance } from 'api/balanceApi';

import { assetsSelectors, assetsActions } from 'ducks/assets';
import { errorHandlerActions } from 'ducks/errorHandler';
import { accountSelectors } from 'ducks/account';

import actions from './actions';

export function* loadBalance() {
  try {
    const accountId = yield select(accountSelectors.accountId);
    let assets = yield select(assetsSelectors.getAssets);

    if (assets.length === 0) {
      yield take(assetsActions.loadAssetsSuccess);
      assets = yield select(assetsSelectors.getAssets);
    }

    const balances = yield call(getBalance, accountId, assets);
    yield put(actions.loadBalanceSuccess(balances));
  } catch (err) {
    yield put(errorHandlerActions.handleNodeError(err));
  }
}

export function* watch() {
  yield takeEvery(actions.loadBalance, loadBalance);
}

export default { watch };
