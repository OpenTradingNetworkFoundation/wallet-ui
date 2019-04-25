import selectors from '../selectors';

describe('Profile selectors', () => {
  const state = {
    profile: {
      1: {
        id: 1,
        name: '1'
      },
      2: {
        id: 2,
        name: '2'
      }
    }
  };

  test('profile', () => {
    expect(selectors.profile(state)).toEqual(state.profile);
  });

  test('profileIds', () => {
    expect(selectors.profileIds(state)).toEqual(['1', '2']);
  });
});
