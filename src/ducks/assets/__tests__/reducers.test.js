import reducer from '../reducers';
import actions from '../actions';

test('should initialize state', () => {
  expect(reducer(undefined)).toEqual([]);
});

test('it should handle loadSuccessAction', () => {
  const assets = ['a', 'b', 'c'];

  expect(reducer(undefined, actions.loadAssetsSuccess(assets))).toEqual(assets);
});
