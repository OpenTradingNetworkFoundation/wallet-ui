import { takeEvery, call, put } from 'redux-saga/effects';
import { validateWithdrawalAddress } from 'api/gatewayApi';
import { errorHandlerActions } from 'ducks/errorHandler';

import actions from './actions';

export function* validateAddress({ payload: { address, asset } }) {
  try {
    const res = yield call(validateWithdrawalAddress, {
      address,
      asset
    });

    yield put(actions.validation(res));
  } catch (error) {
    yield put(errorHandlerActions.handleGatewayError(error));
  }
}

export function* watch() {
  yield takeEvery(actions.requestValidate, validateAddress);
}

export default { watch };
