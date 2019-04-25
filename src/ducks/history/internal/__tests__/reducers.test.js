import reducer from '../reducers';
import actions from '../actions';

describe('Internal history reducer', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({ initialLoad: true, operations: [] });
  });

  describe('loadHistorySuccess', () => {
    test('initial load', () => {
      const history = [1, 2, 3];

      expect(reducer(undefined, actions.loadHistorySuccess(history))).toEqual({
        initialLoad: false,
        operations: history
      });
    });

    test('existing history', () => {
      const history = [1, 2, 3];
      const state = {
        initialLoad: true,
        operations: [4, 5]
      };

      expect(reducer(state, actions.loadHistorySuccess(history))).toEqual({
        initialLoad: false,
        operations: history
      });
    });

    test('immutable', () => {
      const history = [1, 2, 3];
      const result = reducer(undefined, actions.loadHistorySuccess(history));

      expect(result.operations).not.toBe(history);
    });
  });

  describe('updateHistorySuccess', () => {
    test('initial load', () => {
      const history = [1, 2, 3];

      expect(reducer(undefined, actions.updateHistorySuccess(history))).toEqual(
        {
          initialLoad: true,
          operations: history
        }
      );
    });

    test('existing history', () => {
      const history = [1, 2, 3];
      const state = {
        initialLoad: false,
        operations: [4, 5]
      };

      expect(reducer(state, actions.updateHistorySuccess(history))).toEqual({
        initialLoad: false,
        operations: [1, 2, 3, 4, 5]
      });
    });

    test('immutable', () => {
      const history = [1, 2, 3];
      const result = reducer(undefined, actions.updateHistorySuccess(history));

      expect(result.operations).not.toBe(history);
    });
  });
});
