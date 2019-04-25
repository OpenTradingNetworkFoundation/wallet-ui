import { createSelector } from 'reselect';

const profile = state => state.profile;

const profileIds = createSelector(profile, profile => Object.keys(profile));

export default { profile, profileIds };
