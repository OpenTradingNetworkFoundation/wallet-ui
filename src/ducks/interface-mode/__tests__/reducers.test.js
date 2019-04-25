import reducer from '../reducers';
import actions from '../actions';

describe('Interface mode reducer', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({ mode: 'Light' });
  });

  test('update state', () => {
    const state = {
      mode: 'Light'
    };

    expect(reducer(state, actions.updateInterfaceMode('Pro'))).toEqual({
      mode: 'Pro'
    });
  });

  test('immutable', () => {
    const state = { mode: 'Light' };
    const result = reducer(state, actions.updateInterfaceMode('Light'));

    expect(state).not.toBe(result);
  });
});
