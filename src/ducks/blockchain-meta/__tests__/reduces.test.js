import reducer from '../reducers';
import actions from '../actions';

describe('Blockchain Meta reducer', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({ lastIrreversibleBlock: null });
  });

  test('it should handle loadMetaSuccess', () => {
    const meta = {
      last_irreversible_block_num: 1
    };

    expect(reducer(undefined, actions.loadMetaSuccess(meta))).toEqual({
      lastIrreversibleBlock: 1
    });
  });

  test('it should be immutable', () => {
    const meta = {
      last_irreversible_block_num: 1
    };
    const state = {
      last_irreversible_block_num: 2
    };

    const newState = reducer(undefined, actions.loadMetaSuccess(meta));
    expect(newState).toEqual({
      lastIrreversibleBlock: 1
    });

    expect(newState).not.toBe(state);
  });
});
