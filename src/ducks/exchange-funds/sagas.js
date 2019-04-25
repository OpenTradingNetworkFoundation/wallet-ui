import { select, call, put, takeEvery } from 'redux-saga/effects';

import { exchange } from 'api/fundsApi';
import { accountSelectors } from 'ducks/account';
import { authSelectors } from 'ducks/auth';

import actions from './actions';

function* exchangeFunds({ payload: values }) {
  const { from, to, feeAssetId, fillOrKill, expiration } = values;
  const { active: publicKey } = yield select(accountSelectors.publicKeys);
  const privateKey = yield select(authSelectors.getToken);

  const keys = { publicKey, privateKey };

  const accountId = yield select(accountSelectors.accountId);

  try {
    yield call(
      exchange,
      {
        from,
        to,
        feeAssetId,
        accountId,
        fillOrKill,
        expiration
      },
      keys
    );
  } catch (e) {
    yield put(actions.exchangeFundsFail(e));
  }
}

function* watch() {
  yield takeEvery(actions.exchangeFunds, exchangeFunds);
}

export default { watch };
