import { createAction } from 'redux-act';

const LOAD_PROFILES = 'app/profile/LOAD_PROFILES';
const LOAD_PROFILES_SUCCESS = 'app/profile/LOAD_PROFILES_SUCCESS';

const loadProfiles = createAction(LOAD_PROFILES);
const loadProfilesSuccess = createAction(LOAD_PROFILES_SUCCESS);

export default {
  loadProfiles,
  loadProfilesSuccess
};
