import reducer from '../reducers';
import actions from '../actions';

describe('Order book reducers', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({ limitOrders: [] });
  });

  test('update state', () => {
    const state = { limitOrders: [] };

    expect(
      reducer(
        state,
        actions.limitOrdersSuccess({
          baseId: '1.3.0',
          quoteId: '1.3.1',
          limitOrders: [1, 2, 3]
        })
      )
    ).toEqual({
      baseId: '1.3.0',
      quoteId: '1.3.1',
      limitOrders: [1, 2, 3]
    });
  });

  test('immutable', () => {
    const state = { limitOrders: [] };
    const result = reducer(
      state,
      actions.limitOrdersSuccess({ limitOrders: [] })
    );

    expect(state).not.toBe(result);
  });
});
