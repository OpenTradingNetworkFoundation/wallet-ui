import reducer from '../reducers';
import actions from '../actions';

describe('Profile reducer', () => {
  test('should initialize state', () => {
    expect(reducer(undefined)).toEqual({});
  });

  const accounts = [
    {
      id: 1,
      name: '1'
    },
    {
      id: 2,
      name: '2'
    }
  ];

  const state = {
    '1': {
      id: 1,
      name: '1'
    },
    '2': {
      id: 2,
      name: '2'
    }
  };

  test('it should handle loadSuccess', () => {
    expect(reducer(undefined, actions.loadProfilesSuccess(accounts))).toEqual(
      state
    );
  });

  test('it should add new accounts', () => {
    const newState = reducer(
      state,
      actions.loadProfilesSuccess([
        {
          id: 3,
          name: '3'
        }
      ])
    );

    expect(newState).toEqual({
      ...state,
      '3': {
        id: 3,
        name: '3'
      }
    });
    expect(newState).not.toBe(state);
  });

  test('it should be immutable', () => {
    const newState = reducer(state, actions.loadProfilesSuccess([]));

    expect(newState).toEqual(state);
    expect(newState).not.toBe(state);
  });
});
