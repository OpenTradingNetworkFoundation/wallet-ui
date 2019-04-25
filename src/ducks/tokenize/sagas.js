import { call, put, takeEvery } from 'redux-saga/effects';

import { getDepositAddress } from 'api/gatewayApi';

import actions from './actions';

function* requestAddress({ payload }) {
  const { address } = yield call(
    getDepositAddress,
    payload.accountId,
    payload.asset
  );

  yield put(actions.requestAddressSuccess(address));
}

function* watch() {
  yield takeEvery(actions.requestAddress, requestAddress);
}

export default { watch };
