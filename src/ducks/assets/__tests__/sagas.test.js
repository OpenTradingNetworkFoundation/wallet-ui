import { call, takeEvery, put } from 'redux-saga/effects';

import { errorHandlerActions } from 'ducks/errorHandler';
import { listAssets } from 'api/assetsApi';

import actions from '../actions';
import { watch, loadAssets } from '../sagas';

test('loadAssets saga', () => {
  const generator = loadAssets();
  expect(generator.next().value).toEqual(call(listAssets));
  expect(generator.next([{ name: 'OTN' }, { name: 'NOT OTN' }]).value).toEqual(
    put(actions.loadAssetsSuccess([{ name: 'OTN' }]))
  );
});

test('loadAssets error handling', () => {
  const generator = loadAssets();
  generator.next();

  expect(generator.throw('error').value).toEqual(
    put(errorHandlerActions.handleNodeError('error'))
  );
});

test('loadAssets watcher', () => {
  const generator = watch();
  expect(generator.next().value).toEqual(
    takeEvery(actions.loadAssets, loadAssets)
  );
});
