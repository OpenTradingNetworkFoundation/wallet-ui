import { call, put, takeEvery } from 'redux-saga/effects';

import { listAssets } from 'api/assetsApi';
import { errorHandlerActions } from 'ducks/errorHandler';

import { ASSET } from 'enums/asset';

import actions from './actions';

const AVAILABLE_ASSETS = Object.keys(ASSET);

export function* loadAssets() {
  try {
    const assets = yield call(listAssets);

    const filtered = assets.filter(asset =>
      AVAILABLE_ASSETS.includes(asset.name)
    );

    yield put(actions.loadAssetsSuccess(filtered));
  } catch (error) {
    yield put(errorHandlerActions.handleNodeError(error));
  }
}

export function* watch() {
  yield takeEvery(actions.loadAssets, loadAssets);
}

export default { watch };
