import { race, take, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import log from 'utils/log';

import actions from './actions';

const INACTIVE_TIMEOUT = 10 * 60 * 1000;

function* watch() {
  while (true) {
    try {
      const { inactive } = yield race({
        inactive: call(delay, INACTIVE_TIMEOUT),
        active: take(actions.updateActivity)
      });

      if (inactive) {
        yield put(actions.inactive());
      }
    } catch (error) {
      log(error);
    }
  }
}

export default { watch };
