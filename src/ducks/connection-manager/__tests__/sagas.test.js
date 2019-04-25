import { call, takeEvery, put, select } from 'redux-saga/effects';

import { idleActions } from 'ducks/idle';
import { errorHandlerActions } from 'ducks/errorHandler';
import { reconnect } from 'services/connection';

import {
  serviceStatusSelectors as selectors,
  serviceStatusActions
} from 'ducks/serviceStatus';

import actions from '../actions';
import {
  watch,
  registerConnect,
  attemptReconnect,
  registerDisconnect
} from '../sagas';

describe('connection manager sagas', () => {
  describe('attemptReconnect', () => {
    test('attemptReconnect with connected === true', () => {
      const generator = attemptReconnect();

      expect(generator.next().value).toEqual(select(selectors.connection));

      expect(generator.next({ url: '', connected: true }).done).toEqual(true);
    });

    test('attemptReconnect with connected === false', () => {
      const generator = attemptReconnect();

      expect(generator.next().value).toEqual(select(selectors.connection));

      expect(generator.next({ url: 'test', connected: false }).value).toEqual(
        call(reconnect, 'test')
      );

      expect(generator.next().done).toBe(true);
    });

    test('attemptReconnect error handling', () => {
      const generator = attemptReconnect();
      generator.next();
      expect(generator.throw('error').value).toEqual(
        put(errorHandlerActions.handleNodeError('error'))
      );
    });
  });

  test('registerConnect', () => {
    const generator = registerConnect({ payload: { url: 'test' } });
    expect(generator.next().value).toEqual(put(actions.connect('test')));
    expect(generator.next().value).toEqual(
      put(serviceStatusActions.nodeIsActive())
    );
    expect(generator.next().value).toEqual(
      put(serviceStatusActions.applicationStartupSuccess())
    );
  });

  test('registerDisconnect', () => {
    const generator = registerDisconnect();
    expect(generator.next().value).toEqual(put(actions.disconnect()));
  });

  test('watch', () => {
    const generator = watch();
    expect(generator.next().value).toEqual(
      takeEvery(idleActions.updateActivity, attemptReconnect)
    );

    expect(generator.next().value).toEqual(
      takeEvery(actions.registerConnect, registerConnect)
    );

    expect(generator.next().value).toEqual(
      takeEvery(actions.registerDisconnect, registerDisconnect)
    );
  });
});
