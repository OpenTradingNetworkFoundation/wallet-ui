import { call, put, takeEvery } from 'redux-saga/effects';

import { getObject } from 'api/objectApi';
import { errorHandlerActions } from 'ducks/errorHandler';

import actions from './actions';

export function* loadMeta() {
  try {
    const blockchainMeta = yield call(getObject, '2.1.0');
    yield put(actions.loadMetaSuccess(blockchainMeta));
  } catch (err) {
    yield put(errorHandlerActions.handleNodeError(err));
  }
}

export function* watch() {
  yield takeEvery(actions.loadMeta, loadMeta);
}

export default { watch };
