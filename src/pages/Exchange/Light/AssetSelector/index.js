import React from 'react';

import cn from 'utils/bem';
import AssetDropdownSelector from 'components/AssetDropdownSelector';
import AssetIcon from 'elements/AssetIcon';

import { propTypes } from './props';

import './style.styl';

const b = cn('asset-selector');

const AssetSelector = ({
  availableAssets,
  selectedAsset,
  excludedAsset,
  onChange
}) => {
  const assetList = excludedAsset
    ? availableAssets.filter(asset => asset.id !== excludedAsset.id)
    : availableAssets;

  return (
    <div className={b()}>
      <AssetIcon
        className={b('asset-icon')}
        assetName={selectedAsset.name}
        isTokenized={selectedAsset.isTokenized}
      />

      <div className={b('asset-info')}>
        <AssetDropdownSelector
          className={b('asset-dropdown')}
          assets={assetList}
          onChange={onChange}
          selectedAsset={selectedAsset}
          showAmount={false}
          mods={['large', 'align-start']}
        />

        <div
          data-testid={`asset-name-${selectedAsset.name}`}
          className={b('asset-name')}
        >
          {selectedAsset.fullName}
        </div>
      </div>
    </div>
  );
};

AssetSelector.propTypes = propTypes;

export default AssetSelector;
