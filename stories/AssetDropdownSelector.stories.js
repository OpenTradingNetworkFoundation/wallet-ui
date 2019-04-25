import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import { action } from '@storybook/addon-actions';

import AssetDropdownSelector from 'components/AssetDropdownSelector';
import { ASSET } from 'enums/asset';

import BACKGROUND from './enums/background';

import setLayoutSize from './utils/setLayoutSize';

storiesOf('Asset Dropdown Selector', module)
  .addDecorator(s => setLayoutSize(172, 40, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('with balance', () => {
    const assets = [
      {
        asset: ASSET.OTN,
        amount: '189.2327'
      },
      {
        asset: ASSET.BTC,
        isTokenized: true,
        amount: '1.501015'
      },
      {
        asset: ASSET.ETH,
        isTokenized: true,
        amount: '2.9311'
      }
    ];

    return (
      <AssetDropdownSelector
        assets={assets}
        onChange={action('asset selected')}
        selectedAsset={assets[1]}
        label="pay"
      />
    );
  })
  .add('without balance', () => {
    const assets = [
      {
        asset: ASSET.OTN
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
      <AssetDropdownSelector
        assets={assets}
        onChange={action('asset selected')}
        selectedAsset={assets[1]}
        label="pay"
      />
    );
  });
