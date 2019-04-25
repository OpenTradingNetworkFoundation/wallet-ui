import { createSelector } from 'reselect';
import queryString from 'query-string';

const router = state => state.router;
const location = createSelector(router, router => router.location);

export const queryParams = createSelector(location, location =>
  queryString.parse(location.search)
);

export default { location, queryParams };
