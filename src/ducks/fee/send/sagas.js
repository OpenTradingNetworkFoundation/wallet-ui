import { call, put, takeEvery, select, take } from 'redux-saga/effects';

import { getSendFee } from 'api/feeApi';
import { accountSelectors } from 'ducks/account';
import { getAccountById, getAccountByName } from 'api/accountApi';
import { authSelectors } from 'src/ducks/auth';
import AssetAmount from 'src/models/AssetAmount';
import { userLookUpActions, userLookUpSelectors } from 'ducks/user-look-up';
import { errorHandlerActions } from 'ducks/errorHandler';
import handleError from 'utils/handleError';
import { getMemo } from 'services/memo';

import actions from './actions';

const TEMP_USER_ID = '1.2.6';

function* loadFee({ payload: values }) {
  const {
    amount,
    username,
    asset: { id: assetId, precision },
    feeAsset: { id: feeAssetId },
    memo: memoPayload
  } = values;

  const senderId = yield select(accountSelectors.accountId);

  let userLookUpData = yield select(userLookUpSelectors.userLookUp);
  if (userLookUpData.isLoading) {
    yield take(userLookUpActions.lookUpSuccess);
    userLookUpData = yield select(userLookUpSelectors.userLookUp);
  }

  let account;
  if (username && userLookUpData.exist) {
    // If user validation is not passed yet, we have to wait until username won't be checked
    account = yield getAccountByName(username);
  }

  const recipientId = account ? account.id : TEMP_USER_ID;

  let memo = null;
  if (memoPayload && userLookUpData.hasNotNullMemoKey) {
    const accountPublicKeys = yield select(accountSelectors.publicKeys);
    const privateKey = yield select(authSelectors.getToken);
    const recipientAccount = yield call(getAccountById, recipientId);

    memo = getMemo(
      privateKey,
      accountPublicKeys.memo,
      recipientAccount.options.memo_key,
      memoPayload
    );
  }

  const feeAmount = yield call(getSendFee, {
    amount: AssetAmount.normalize(amount, precision),
    assetId,
    feeAssetId,
    senderId,
    recipientId,
    memo
  });
  yield put(actions.loadFeeSuccess(String(feeAmount))); // TODO this should be fixed when assets will come with pointer
}

function* watch() {
  yield takeEvery(
    actions.loadFee,
    handleError(loadFee, errorHandlerActions.handleNodeError)
  );
}

export default { watch };
