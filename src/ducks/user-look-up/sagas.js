import { call, put, takeEvery } from 'redux-saga/effects';

import { getAccountByName } from 'api/accountApi';

import actions from './actions';

function* lookUp(action) {
  const username = action.payload;
  const account = yield call(getAccountByName, username);

  yield put(actions.lookUpSuccess({ account, isLoading: false }));
}

function* watch() {
  yield takeEvery(actions.lookUp, lookUp);
}

export default { watch };
