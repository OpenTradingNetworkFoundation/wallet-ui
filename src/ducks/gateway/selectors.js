import { createSelector } from 'reselect';
import createCachedSelector, { LruMapCache } from 're-reselect';
import { groupBy } from 'lodash';

const CACHE_SIZE = 15;

const data = state => state.gateway;

const availableAssets = createSelector(data, data => data.availableAssets);

const gatewayId = createSelector(data, data => data.gatewayId);

const supportedAssets = createCachedSelector(
  availableAssets,
  (state, selector) => selector(state),
  (assets, balances) => {
    const availableIds = assets.map(asset => asset.id);

    return balances.filter(balance => availableIds.includes(balance.id));
  }
)((state, selector) => selector(state), {
  cacheObject: new LruMapCache({ cacheSize: CACHE_SIZE })
});

const availableAssetsById = createSelector(availableAssets, assets =>
  groupBy(assets, 'id')
);

export default { gatewayId, supportedAssets, availableAssetsById };
