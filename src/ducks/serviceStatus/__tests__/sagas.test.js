import {
  call,
  put,
  fork,
  race,
  cancelled,
  join,
  takeLatest,
  take,
  cancel
} from 'redux-saga/effects';
import { getInfo } from 'api/gatewayApi';
import { delay } from 'redux-saga';
import { createMockTask } from 'redux-saga/utils';

import * as actions from '../actions';

import {
  runStatusCheck,
  watch,
  handlePing,
  fibonacciPoll,
  handleBackoff
} from '../sagas';

describe('serviceStatus sagas', () => {
  describe('runStatusCheck', () => {
    test('marks gateway as active if getInfo is successfull', () => {
      const generator = runStatusCheck();

      expect(generator.next().value).toEqual(call(getInfo));
      expect(generator.next().value).toEqual(put(actions.gatewayIsActive()));
    });

    test('marks gateway as inactive if getInfo is successfull', () => {
      const generator = runStatusCheck();

      expect(generator.next().value).toEqual(call(getInfo));
      expect(generator.throw('error').value).toEqual(
        put(actions.gatewayIsDown())
      );
    });
  });

  describe('watch', () => {
    const generator = watch();

    expect(generator.next().value).toEqual(
      takeLatest(actions.reportGatewayStatus, runStatusCheck)
    );
    expect(generator.next().value).toEqual(
      takeLatest(actions.backoff, handleBackoff)
    );
    expect(generator.next().value).toEqual(
      takeLatest([actions.ping, actions.pingCancel], handlePing)
    );

    expect(generator.next().value).toEqual(take(actions.gatewayIsDown));
    expect(generator.next().value).toEqual(
      fork(fibonacciPoll, {
        randomizationFactor: 0.5,
        initialDelay: 500,
        maxDelay: 10000
      })
    );
    const pollTask = createMockTask();
    expect(generator.next(pollTask).value).toEqual(
      take(actions.gatewayIsActive)
    );

    expect(generator.next(pollTask).value).toEqual(cancel(pollTask));
  });

  describe('handlePing', () => {
    test('completes if ping is canceled', () => {
      const generator = handlePing(actions.pingCancel());
      expect(generator.next().done).toBeTruthy();
    });

    test('dispatches successfull ping if call returns info', () => {
      const generator = handlePing(actions.ping());

      expect(generator.next().value).toEqual(fork(delay, 1000));
      const delayTask = createMockTask();

      expect(generator.next(delayTask).value).toEqual(
        race({
          ping: call(getInfo),
          // Timeout if ping takes longer than 5 seconds
          timeout: call(delay, 5000)
        })
      );

      expect(
        generator.next({ ping: { info: { status: 'OK' } } }).value
      ).toEqual(put(actions.pingSuccess()));

      expect(generator.next().value).toEqual(cancelled());
      expect(generator.next().done).toBe(true);
    });

    test('dispatches unsuccessfull ping if call returns nothing', () => {
      const generator = handlePing(actions.ping());

      expect(generator.next().value).toEqual(fork(delay, 1000));
      const delayTask = createMockTask();

      expect(generator.next(delayTask).value).toEqual(
        race({
          ping: call(getInfo),
          // Timeout if ping takes longer than 5 seconds
          timeout: call(delay, 5000)
        })
      );

      expect(
        generator.next({ ping: { info: { status: 'NOT OK' } } }).value
      ).toEqual(join(delayTask));

      expect(generator.next().value).toEqual(put(actions.pingFailure()));
      expect(generator.next().value).toEqual(cancelled());
      expect(generator.next(false).done).toBe(true);
    });

    test('dispatches unsuccessful ping upon error', () => {
      const generator = handlePing(actions.ping());

      expect(generator.next().value).toEqual(fork(delay, 1000));
      const delayTask = createMockTask();

      expect(generator.next(delayTask).value).toEqual(
        race({
          ping: call(getInfo),
          // Timeout if ping takes longer than 5 seconds
          timeout: call(delay, 5000)
        })
      );
      expect(generator.throw('error').value).toEqual(join(delayTask));
      expect(generator.next().value).toEqual(put(actions.pingFailure()));
      expect(generator.next().value).toEqual(cancelled());
      expect(generator.next(false).done).toBe(true);
    });

    test('dispatches unsuccessful ping upon cancellation', () => {
      const generator = handlePing(actions.ping());

      expect(generator.next().value).toEqual(fork(delay, 1000));

      const delayTask = createMockTask();
      expect(generator.next(delayTask).value).toEqual(
        race({
          ping: call(getInfo),
          // Timeout if ping takes longer than 5 seconds
          timeout: call(delay, 5000)
        })
      );
      expect(generator.return().value).toEqual(cancelled());
      expect(generator.next(true).value).toEqual(put(actions.pingFailure()));
      expect(generator.next().done).toBe(true);
    });
  });

  describe('fibonacciPoll', () => {
    test('should dispatch gatewayIsActive if ping is successfull', () => {
      const generator = fibonacciPoll({
        randomizationFactor: 0.5,
        initialDelay: 500,
        maxDelay: 10000
      });

      expect(generator.next().value).toEqual(put(actions.ping()));
      expect(generator.next().value).toEqual(
        take([actions.pingSuccess, actions.pingFailure])
      );

      expect(generator.next(actions.pingSuccess()).value).toEqual(
        put(actions.gatewayIsActive())
      );
    });

    test('should retry if ping is unsuccessfull and ping completed first', () => {
      const generator = fibonacciPoll({
        randomizationFactor: 0,
        initialDelay: 500,
        maxDelay: 10000
      });

      expect(generator.next().value).toEqual(put(actions.ping()));
      expect(generator.next().value).toEqual(
        take([actions.pingSuccess, actions.pingFailure])
      );

      expect(generator.next(actions.pingFailure()).value).toEqual(
        put(actions.backoff(500))
      );

      expect(generator.next().value).toEqual(
        race({
          backoffComplete: take(actions.backoffComplete),
          ping: take(actions.ping)
        })
      );

      expect(generator.next({ ping: true }).value).toEqual(
        take([actions.pingSuccess, actions.pingFailure])
      );
    });

    test('should dispatch ping if ping is unsuccessfull and backoff completed first', () => {
      const generator = fibonacciPoll({
        randomizationFactor: 0.5,
        initialDelay: 500,
        maxDelay: 10000
      });

      expect(generator.next().value).toEqual(put(actions.ping()));
      expect(generator.next().value).toEqual(
        take([actions.pingSuccess, actions.pingFailure])
      );

      expect(generator.next(actions.pingFailure()).value).toEqual(
        put(actions.backoff(500))
      );

      expect(generator.next().value).toEqual(
        race({
          backoffComplete: take(actions.backoffComplete),
          ping: take(actions.ping)
        })
      );

      expect(generator.next({ backoffComplete: true }).value).toEqual(
        put(actions.ping())
      );
    });
  });
});
