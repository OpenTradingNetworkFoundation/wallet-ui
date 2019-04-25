import { call, put, takeEvery, select } from 'redux-saga/effects';

import { getExchangeFee } from 'api/feeApi';
import { authSelectors } from 'ducks/auth';
import { accountSelectors } from 'ducks/account';
import { errorHandlerActions } from 'ducks/errorHandler';

import actions from './actions';

function* loadFee({ payload: values }) {
  try {
    const { from, to, feeAssetId } = values;

    const { active: publicKey } = yield select(accountSelectors.publicKeys);
    const privateKey = yield select(authSelectors.getToken);

    const keys = { publicKey, privateKey };

    const accountId = yield select(accountSelectors.accountId);

    const feeAmount = yield call(
      getExchangeFee,
      {
        from,
        to,
        feeAssetId,
        accountId
      },
      keys
    );

    yield put(actions.loadFeeSuccess(String(feeAmount)));
  } catch (error) {
    yield put(errorHandlerActions.handleNodeError(error));
  }
}

function* watch() {
  yield takeEvery(actions.loadFee, loadFee);
}

export default { watch };
