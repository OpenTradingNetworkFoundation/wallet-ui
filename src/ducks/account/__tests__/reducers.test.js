import reducer from '../reducers';
import actions from '../actions';

describe('account reducers', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual(null);
  });

  test('it should handle update action', () => {
    const account = {
      id: 'id',
      name: 'name'
    };

    expect(reducer(undefined, actions.update(account))).toEqual(account);
    expect(reducer(undefined, actions.update(account))).not.toBe(account);
  });
});
