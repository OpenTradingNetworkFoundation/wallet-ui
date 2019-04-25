import React from 'react';

import { ASSET_ICON } from 'enums/asset';
import TokenizedIcon from 'elements/TokenizedIcon';

import { propTypes } from './props';

const AssetIcon = ({ assetName, className, isTokenized }) => {
  const Icon = ASSET_ICON[assetName];

  if (isTokenized) {
    return <TokenizedIcon Icon={Icon} className={className} />;
  } else {
    return <Icon className={className} />;
  }
};

AssetIcon.propTypes = propTypes;

export default AssetIcon;
