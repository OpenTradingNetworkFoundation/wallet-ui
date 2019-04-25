import { call, put, takeEvery, select } from 'redux-saga/effects';
import { difference } from 'lodash';

import { errorHandlerActions } from 'ducks/errorHandler';
import { getAccounts } from 'src/api/accountApi';

import actions from './actions';
import selectors from './selectors';

export function* loadProfiles({ payload: ids }) {
  try {
    const loadedIds = yield select(selectors.profileIds);
    const idsToLoad = difference(ids, loadedIds);

    if (idsToLoad.length) {
      const accounts = yield call(getAccounts, idsToLoad);

      yield put(actions.loadProfilesSuccess(accounts));
    }
  } catch (error) {
    yield put(errorHandlerActions.handleNodeError(error));
  }
}

export function* watch() {
  yield takeEvery(actions.loadProfiles, loadProfiles);
}

export default { watch };
