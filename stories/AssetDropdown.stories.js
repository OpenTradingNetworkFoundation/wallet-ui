import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import { action } from '@storybook/addon-actions';

import AssetDropdown from 'components/AssetDropdown';
import { ASSET } from 'enums/asset';

import BACKGROUND from './enums/background';

import setLayoutSize from './utils/setLayoutSize';

storiesOf('Asset Dropdown', module)
  .addDecorator(s => setLayoutSize(350, 40, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Asset Dropdown', () => {
    const assets = [
      {
        asset: ASSET.OTN,
        isTokenized: false
      },
      {
        asset: ASSET.BTC,
        isTokenized: true
      },
      {
        asset: ASSET.ETH,
        isTokenized: true
      }
    ];

    return (
      <AssetDropdown
        assets={assets}
        onChange={action('asset selected')}
        selectedAsset={assets[1]}
      />
    );
  });
