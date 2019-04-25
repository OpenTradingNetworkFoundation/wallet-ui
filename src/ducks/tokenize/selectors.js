import { createSelector } from 'reselect';

const getData = state => state.tokenize;
const getAddressRequest = createSelector(getData, data => data.address);

export default { getAddressRequest };
