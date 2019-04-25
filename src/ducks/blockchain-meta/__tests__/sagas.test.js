import { call, takeEvery, put } from 'redux-saga/effects';

import { errorHandlerActions } from 'ducks/errorHandler';
import { getObject } from 'api/objectApi';

import actions from '../actions';
import { watch, loadMeta } from '../sagas';

describe('Blockchain meta sagas', () => {
  test('loadMeta saga', () => {
    const generator = loadMeta();
    const payload = { last_irreversible_block_num: 1 };

    expect(generator.next().value).toEqual(call(getObject, '2.1.0'));
    expect(generator.next(payload).value).toEqual(
      put(actions.loadMetaSuccess(payload))
    );
  });

  test('loadMeta error handling', () => {
    const generator = loadMeta();
    generator.next();

    expect(generator.throw('error').value).toEqual(
      put(errorHandlerActions.handleNodeError('error'))
    );
  });

  test('loadAssets watcher', () => {
    const generator = watch();
    expect(generator.next().value).toEqual(
      takeEvery(actions.loadMeta, loadMeta)
    );
  });
});
