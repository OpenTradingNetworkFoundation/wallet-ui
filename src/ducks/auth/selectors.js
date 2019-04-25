import { createSelector } from 'reselect';

const getData = state => state.auth;
const check = createSelector(getData, data => Boolean(data.token));
const getToken = createSelector(getData, data => data.token);

export default { check, getToken };
