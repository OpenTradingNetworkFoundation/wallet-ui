import reducer from '../reducers';
import actions from '../actions';

const state = {
  isFetching: false,
  assets: [1, 2, 3]
};

describe('balance reducers', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({
      isFetching: false,
      assets: []
    });
  });

  test('load balance', () => {
    expect(reducer(state, actions.loadBalance())).toEqual({
      isFetching: true,
      assets: [1, 2, 3]
    });
  });

  test('load balance success', () => {
    expect(reducer(state, actions.loadBalanceSuccess([3, 4, 5]))).toEqual({
      isFetching: false,
      assets: [3, 4, 5]
    });
  });
});
