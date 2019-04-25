import { createSelector } from 'reselect';

const data = state => state.gatewayFee;

const fee = createSelector(data, data => data.fee);

export default { fee };
