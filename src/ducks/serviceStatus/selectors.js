import { createSelector } from 'reselect';

const serviceStatus = state => state.serviceStatus;

export const connection = createSelector(
  serviceStatus,
  serviceStatus => serviceStatus.connection
);

export const status = createSelector(
  serviceStatus,
  serviceStatus => serviceStatus.status
);

export default {
  connection,
  status
};
