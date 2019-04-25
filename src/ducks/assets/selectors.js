import { createSelector } from 'reselect';

import { ASSET } from 'enums/asset';

const getAssets = state => state.assets;
const getOtnAsset = createSelector(getAssets, assets =>
  assets.find(asset => asset.name === ASSET.OTN)
);
const getNotCoreAssets = createSelector(
  [getAssets, getOtnAsset],
  (assets, otnAsset) => assets.filter(asset => asset !== otnAsset)
);

export default { getAssets, getOtnAsset, getNotCoreAssets };
