import {
  select,
  race,
  take,
  call,
  put,
  takeEvery,
  fork
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { idleActions } from 'ducks/idle';

import actions from './actions';

// timeout
const INACTIVE_TIMEOUT = 5 * 1000;

// animations
const SHOW_TIMEOUT = 240;
const HIDE_TIMEOUT = 2000;
const CLOSE_TIMEOUT = 240;
const COLLAPSE_TIMEOUT = 160;

// utils
const selectCloseAction = id => ({ type, payload }) => {
  return type === actions.itemClose.getType() && payload.id === id;
};

// sagas
function* onCreate(action) {
  const { id } = action.payload;

  yield call(delay, 0);
  yield put(actions.itemShow({ id }));
  yield call(delay, SHOW_TIMEOUT);

  yield take(idleActions.updateActivity.getType());
  const isFocused = yield select(state => state.toast.isFocused);

  if (isFocused) {
    const { close } = yield race({
      blur: take(actions.blur.getType()),
      close: take(selectCloseAction(id))
    });

    // close
    if (close) {
      yield fork(onClose, id);
      return;
    }
  }

  yield fork(startTimeout, id);
}

function* startTimeout(id) {
  const { timeout, focus } = yield race({
    timeout: call(delay, INACTIVE_TIMEOUT),
    focus: take(actions.focus.getType()),
    close: take(selectCloseAction(id))
  });

  // timeout
  if (timeout) {
    yield put(actions.itemHide({ id }));
    const { timeout } = yield race({
      timeout: call(delay, HIDE_TIMEOUT),
      focus: take(actions.focus.getType())
    });

    // timeout
    if (timeout) {
      yield put(actions.itemCollapse({ id }));
      yield call(delay, COLLAPSE_TIMEOUT);

      yield put(actions.itemRemove({ id }));
      return;
    }

    // focus
    yield put(actions.itemShow({ id }));
    yield take(actions.blur.getType());
    yield fork(startTimeout, id);
    return;
  }

  // focus
  if (focus) {
    yield put(actions.itemShow({ id }));
    const { blur } = yield race({
      blur: take(actions.blur.getType()),
      close: take(selectCloseAction(id))
    });

    if (blur) {
      yield fork(startTimeout, id);
      return;
    }
  }

  // close
  yield fork(onClose, id);
}

function* onClose(id) {
  yield put(actions.itemClose({ id }));
  yield call(delay, CLOSE_TIMEOUT);

  yield put(actions.itemCollapse({ id }));
  yield call(delay, COLLAPSE_TIMEOUT);

  yield put(actions.itemRemove({ id }));
}

function* watch() {
  yield takeEvery(actions.itemCreate.getType(), onCreate);
}

export default { watch };
