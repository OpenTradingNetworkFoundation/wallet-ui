import reducer from '../reducers';
import actions from '../actions';

describe('External history reducer', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({ initialLoad: true, operations: [] });
  });

  describe('loadHistorySuccess', () => {
    test('initial load', () => {
      const operations = [1, 2, 3];
      const result = reducer(
        { initialLoad: true, operations: [] },
        actions.loadHistorySuccess({ operations })
      );

      expect(result).toEqual({
        initialLoad: false,
        operations: operations
      });

      expect(result.operations).not.toBe(operations);
    });
  });
});
