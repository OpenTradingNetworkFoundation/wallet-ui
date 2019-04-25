import {
  takeLatest,
  put,
  call,
  take,
  cancelled,
  fork,
  race,
  join,
  cancel
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getInfo } from 'api/gatewayApi';

import * as actions from './actions';

const getNextFibonacciValue = (randomizationFactor, previous, current) => {
  const next = previous + current;
  return next + next * randomizationFactor * Math.random();
};

export function* runStatusCheck() {
  try {
    yield call(getInfo);
    yield put(actions.gatewayIsActive());
  } catch (error) {
    yield put(actions.gatewayIsDown());
  }
}

export function* handlePing({ type }) {
  if (type.includes(actions.PING_CANCEL)) {
    return;
  }

  // Ensure ping takes at least 1 second
  const delayTask = yield fork(delay, 1000);

  try {
    const { ping: response } = yield race({
      ping: call(getInfo),
      // Timeout if ping takes longer than 5 seconds
      timeout: call(delay, 5000)
    });

    if (response) {
      if (response.info.status === 'OK') {
        // Ping succeeded; indicate success immediately
        yield put(actions.pingSuccess());
      } else {
        // Ping response is 4xx / 5xx; wait until delay completes, then indicate failure
        yield join(delayTask);
        yield put(actions.pingFailure());
      }
    } else {
      // Timed out
      yield put(actions.pingFailure());
    }
  } catch (error) {
    // Ping failed; wait until delay completes
    yield join(delayTask);
    yield put(actions.pingFailure());
  } finally {
    if (yield cancelled()) {
      yield put(actions.pingFailure());
    }
  }
}

export function* fibonacciPoll({
  randomizationFactor,
  initialDelay,
  maxDelay
}) {
  let previousDelay = 0;
  let currentDelay = initialDelay;

  try {
    yield put(actions.ping());
    while (true) {
      const action = yield take([actions.pingSuccess, actions.pingFailure]);
      if (action.type.includes(actions.PING_SUCCESS)) {
        yield put(actions.gatewayIsActive());
      } else {
        // Ping failed; backoff
        yield put(actions.backoff(currentDelay));
        // Wait for a manual ping, or until the backoff has completed.
        const winner = yield race({
          backoffComplete: take(actions.backoffComplete),
          ping: take(actions.ping)
        });

        if (winner.backoffComplete) {
          // Delay has elapsed; trigger another ping
          yield put(actions.ping());
        }

        const nextDelay = getNextFibonacciValue(
          randomizationFactor,
          previousDelay,
          currentDelay
        );

        previousDelay = currentDelay;
        currentDelay = Math.min(nextDelay, maxDelay);
      }
    }
  } finally {
    if (yield cancelled()) {
      yield put(actions.pingCancel());
    }
  }
}

export function* handleBackoff({ payload: ms }) {
  yield call(delay, ms);
  yield put(actions.backoffComplete());
}

export function* watch() {
  yield takeLatest(actions.reportGatewayStatus, runStatusCheck);
  yield takeLatest(actions.backoff, handleBackoff);
  yield takeLatest([actions.ping, actions.pingCancel], handlePing);

  while (true) {
    yield take(actions.gatewayIsDown);
    const pollTask = yield fork(fibonacciPoll, {
      randomizationFactor: 0.5,
      initialDelay: 500,
      maxDelay: 10000
    });
    yield take(actions.gatewayIsActive);
    yield cancel(pollTask);
  }
}
