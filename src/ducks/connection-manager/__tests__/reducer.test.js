import reducer from '../reducer';
import actions from '../actions';

describe('connection manager reducer', () => {
  test('initial state', () => {
    expect(reducer()).toEqual({ connected: false, url: '' });
  });

  test('connect', () => {
    expect(reducer(undefined, actions.connect('test'))).toEqual({
      connected: true,
      url: 'test'
    });
  });

  test('disconnect', () => {
    expect(reducer({ url: 'test' }, actions.disconnect())).toEqual({
      connected: false,
      url: 'test'
    });
  });
});
