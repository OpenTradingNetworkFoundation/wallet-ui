import { takeEvery, put } from 'redux-saga/effects';

import { serviceStatusActions } from 'ducks/serviceStatus';

import actions from './actions';

function* handleError({ payload: { message, stack } }) {
  yield put(actions.genericError({ message, stack }));
}

function* handleGatewayError() {
  yield put(actions.gatewayError());
  yield put(serviceStatusActions.gatewayIsDown());
}

function* handleNodeError() {
  yield put(actions.nodeError());
  yield put(serviceStatusActions.nodeIsDown());
}

function* watch() {
  yield takeEvery(actions.handleError, handleError);
  yield takeEvery(actions.handleGatewayError, handleGatewayError);
  yield takeEvery(actions.handleNodeError, handleNodeError);
}

export default { watch };
