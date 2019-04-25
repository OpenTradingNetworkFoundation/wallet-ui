import { get } from 'lodash';
import store from 'src/store';
import { routerActions } from 'ducks/router';

export const syncQueryParams = (
  queryParam,
  path,
  callback
) => valueContainer => {
  const value = get(valueContainer, path, valueContainer);

  store.dispatch(
    routerActions.navigate({
      search: { [queryParam]: value }
    })
  );

  callback && callback(valueContainer);
};
