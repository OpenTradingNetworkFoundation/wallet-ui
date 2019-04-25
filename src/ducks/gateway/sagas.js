import { call, put, all, take, fork } from 'redux-saga/effects';
import { get } from 'lodash';

import { getInfo, getAssets } from 'api/gatewayApi';
import { errorHandlerActions } from 'ducks/errorHandler';
import { serviceStatusActions } from 'ducks/serviceStatus';

import actions from './actions';

function* loadInfo() {
  try {
    const [info, assets] = yield all([call(getInfo), call(getAssets)]);
    const gatewayId = get(info, 'info.gateway_id');
    const availableAssets = get(assets, 'assets', []);
    yield put(actions.getInfoSuccess({ gatewayId, availableAssets }));
  } catch (error) {
    yield put(errorHandlerActions.handleGatewayError());
  }
}

function* watch() {
  while (true) {
    yield take(serviceStatusActions.gatewayIsActive);
    yield fork(loadInfo);
  }
}

export default { watch };
