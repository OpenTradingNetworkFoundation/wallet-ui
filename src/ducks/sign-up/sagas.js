import { call, put, takeEvery } from 'redux-saga/effects';

import { checkIfExist, createAccount } from 'api/accountApi';
import { generateKeys, generatePassword } from 'services/keyService';

import actions from './actions';

const ACCOUNT_EXISTS_ERROR =
  'This login already exists. Try to come up with a new login';

function _registerError(error) {
  return actions.signUpUpdate({ error, isFetching: false });
}

function* signUpRequest(action) {
  const { login } = action.payload;

  try {
    const isExist = yield call(checkIfExist, login);

    if (isExist) {
      yield put(_registerError({ message: ACCOUNT_EXISTS_ERROR }));
      return;
    }

    const password = generatePassword();
    const keys = generateKeys(login, password);

    yield call(createAccount, login, {
      active: keys.publicKey,
      owner: keys.publicKey,
      memo: keys.publicKey
    });

    const resultPayload = {
      error: null,
      isFetching: false,
      result: { login, password }
    };

    yield put(actions.signUpUpdate(resultPayload));
  } catch (err) {
    yield put(_registerError({ message: err.message }));
  }
}

function* watch() {
  yield takeEvery(actions.signUpRequest, signUpRequest);
}

export default { watch };
