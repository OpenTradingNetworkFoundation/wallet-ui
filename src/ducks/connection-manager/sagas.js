import { takeEvery, put, select, call } from 'redux-saga/effects';
import { idleActions } from 'ducks/idle';
import { errorHandlerActions } from 'ducks/errorHandler';

import { reconnect } from 'services/connection';

import {
  serviceStatusSelectors,
  serviceStatusActions
} from 'ducks/serviceStatus';

import actions from './actions';

export function* attemptReconnect() {
  try {
    const { url, connected } = yield select(serviceStatusSelectors.connection);

    if (connected === false) {
      yield call(reconnect, url);
    }
  } catch (error) {
    yield put(errorHandlerActions.handleNodeError(error));
  }
}

export function* registerConnect({ payload: { url } }) {
  yield put(actions.connect(url));
  yield put(serviceStatusActions.nodeIsActive());
  yield put(serviceStatusActions.applicationStartupSuccess());
}

export function* registerDisconnect() {
  yield put(actions.disconnect());
  yield put(serviceStatusActions.nodeIsDown());
}

export function* watch() {
  yield takeEvery(idleActions.updateActivity, attemptReconnect);
  yield takeEvery(actions.registerConnect, registerConnect);
  yield takeEvery(actions.registerDisconnect, registerDisconnect);
}

export default { watch };
