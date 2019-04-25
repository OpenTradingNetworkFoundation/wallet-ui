import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'lodash';

import { getAssets } from 'api/gatewayApi';
import { errorHandlerActions } from 'ducks/errorHandler';
import handleError from 'utils/handleError';

import actions from './actions';

function* loadFee() {
  const { assets } = yield call(getAssets);

  const fees = assets.map(asset => {
    const fee = get(asset, 'withdrawal.fixed_fee');
    const id = asset.id;

    return { id, fee };
  });

  yield put(actions.loadSuccess(fees));
}

function* watch() {
  yield takeEvery(
    actions.loadFees,
    handleError(loadFee, errorHandlerActions.handleGatewayError)
  );
}

export default { watch };
