import actions from '../actions';

describe('Profile actions', () => {
  test('loadProfiles', () => {
    expect(actions.loadProfiles.getType()).toContain(
      'app/profile/LOAD_PROFILES'
    );
  });

  test('loadProfilesSucess', () => {
    expect(actions.loadProfilesSuccess.getType()).toContain(
      'app/profile/LOAD_PROFILES_SUCCESS'
    );
  });
});
