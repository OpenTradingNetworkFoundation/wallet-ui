import { call, takeEvery, select } from 'redux-saga/effects';

import { send } from 'api/fundsApi';
import { getAccountByName } from 'api/accountApi';

import { accountSelectors } from 'ducks/account';
import { authSelectors } from 'ducks/auth';
import { errorHandlerActions } from 'ducks/errorHandler';
import { getMemo } from 'services/memo';
import handleError from 'utils/handleError';

import AssetAmount from 'src/models/AssetAmount';

import actions from './actions';

function* sendFunds({ payload: values }) {
  const {
    amount,
    username,
    asset: { id: assetId, precision },
    feeAsset: { id: feeAssetId },
    memo: memoPayload
  } = values;

  const { active: publicKey, memo: memoPublicKey } = yield select(
    accountSelectors.publicKeys
  );
  const privateKey = yield select(authSelectors.getToken);

  const keys = { publicKey, privateKey };

  const senderId = yield select(accountSelectors.accountId);

  const account = yield call(getAccountByName, username);

  const recipientId = account.id;

  let memo = null;
  if (memoPayload) {
    memo = getMemo(
      privateKey,
      memoPublicKey,
      account.options.memo_key,
      memoPayload
    );
  }

  yield call(
    send,
    {
      amount: AssetAmount.normalize(amount, precision),
      assetId,
      feeAssetId,
      senderId,
      recipientId,
      memo
    },
    keys
  );
}

function* watch() {
  yield takeEvery(
    actions.sendFunds,
    handleError(sendFunds, errorHandlerActions.handleNodeError)
  );
}

export default { watch };
