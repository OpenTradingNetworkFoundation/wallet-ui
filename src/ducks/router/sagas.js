import { push, goBack } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';

import actions from './actions';

function* navigate({ payload: { pathname, search, ...rest } }) {
  yield put(
    push({
      pathname,
      search: search ? queryString.stringify(search) : '',
      ...rest
    })
  );
}

function* back() {
  yield put(goBack());
}

function* watch() {
  yield takeEvery(actions.navigate, navigate);
  yield takeEvery(actions.back, back);
}

export default { watch };
