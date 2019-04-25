import { call, takeEvery, select } from 'redux-saga/effects';
import { TransactionHelper, Aes } from 'bitsharesjs';

import { send } from 'api/fundsApi';
import { getAccountById } from 'api/accountApi';

import { accountSelectors } from 'ducks/account';
import { authSelectors } from 'ducks/auth';
import { errorHandlerActions } from 'ducks/errorHandler';
import handleError from 'utils/handleError';

import AssetAmount from 'src/models/AssetAmount';

import actions from './actions';

// TODO this module is a copy-past of duck/fee/send. It should be refactored with correct saga architecture.
// TODO both modules have the same functionality.
function* detokenizeFunds({ payload: values }) {
  const {
    amount,
    recipientId,
    asset: { id: assetId, precision },
    feeAsset: { id: feeAssetId }
  } = values;

  const { active: publicKey } = yield select(accountSelectors.publicKeys);
  const privateKey = yield select(authSelectors.getToken);

  const keys = { publicKey, privateKey };

  const senderId = yield select(accountSelectors.accountId);
  const accountPublicKeys = yield select(accountSelectors.publicKeys);

  const recipientAccount = yield call(getAccountById, recipientId);

  const nonce = TransactionHelper.unique_nonce_uint64();
  const message = Aes.encrypt_with_checksum(
    privateKey,
    recipientAccount.options.memo_key,
    nonce,
    JSON.stringify(values.message)
  );

  const memo = {
    message,
    from: accountPublicKeys.memo,
    to: recipientAccount.options.memo_key, // TODO looks like a selector or formatter
    nonce
  };

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
    actions.detokenizeFunds,
    handleError(detokenizeFunds, errorHandlerActions.handleNodeError)
  );
}

export default { watch };
