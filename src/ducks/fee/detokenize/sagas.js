import { call, put, takeEvery, select } from 'redux-saga/effects';
import { TransactionHelper, Aes } from 'bitsharesjs';

import { getSendFee } from 'api/feeApi';
import { getAccountById } from 'api/accountApi';
import { authSelectors } from 'ducks/auth';
import { accountSelectors } from 'ducks/account';
import { errorHandlerActions } from 'ducks/errorHandler';
import handleError from 'utils/handleError';

import AssetAmount from 'src/models/AssetAmount';

import actions from './actions';

// TODO this module is a copy-past of duck/fee/send. It should be refactored with correct saga architecture.
// TODO both modules have the same functionality.

function* loadFee({ payload: values }) {
  const {
    amount,
    recipientId,
    asset: { id: assetId, precision },
    feeAsset: { id: feeAssetId }
  } = values;

  const senderId = yield select(accountSelectors.accountId);
  const accountPublicKeys = yield select(accountSelectors.publicKeys);
  const privateKey = yield select(authSelectors.getToken);

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

  const feeAmount = yield call(getSendFee, {
    amount: AssetAmount.normalize(amount, precision),
    assetId,
    feeAssetId,
    senderId,
    recipientId,
    memo
  });

  yield put(actions.loadFeeSuccess(String(feeAmount)));
}

function* watch() {
  yield takeEvery(
    actions.loadFee,
    handleError(loadFee, errorHandlerActions.handleNodeError)
  );
}

export default { watch };
