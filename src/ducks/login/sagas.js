import { call, put, takeEvery } from 'redux-saga/effects';

import { getAccountByName } from 'api/accountApi';
import authService from 'services/authService';
import { accountActions } from 'ducks/account';
import { authActions } from 'ducks/auth';
import { idleActions } from 'ducks/idle';
import rootActions from 'ducks/root/actions';

import actions from './actions';

const LOGIN_ERROR = `Account doesn't exist`;
const PASSWORD_ERROR = 'Password is incorrect';

function* loginRequest(action) {
  const { login, password } = action.payload;

  const account = yield call(getAccountByName, login);

  if (!account) {
    yield put(
      actions.loginRequestFailure({ message: LOGIN_ERROR, field: 'login' })
    );
    return;
  }

  const token = yield call(authService.authenticate, account, password);

  if (!token) {
    yield put(
      actions.loginRequestFailure({
        message: PASSWORD_ERROR,
        field: 'password'
      })
    );
    return;
  }

  yield put(authActions.update({ token }));
  yield put(accountActions.update(account));
  yield call(authService.setAuthName, account.name);
  yield put(actions.loginRequestSuccess());
}

function* logout({ expire }) {
  yield put(authActions.update({ token: null }));

  if (expire) {
    return;
  }

  yield put(rootActions.resetStore());
  yield call(authService.removeAuthName);
}

function* watch() {
  yield takeEvery(actions.loginRequest, loginRequest);
  yield takeEvery(actions.logout, logout);
  yield takeEvery(idleActions.inactive, logout, { expire: true });
}

export default { watch };
