import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import { action } from '@storybook/addon-actions';

import FeePanel from 'components/FeePanel';
import { ASSET } from 'enums/asset';

import BACKGROUND from './enums/background';

import setLayoutSize from './utils/setLayoutSize';

storiesOf('Fee Panel', module)
  .addDecorator(s => setLayoutSize(500, 40, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Fee Panel (500 x 40)', () => {
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
      <FeePanel
        assets={assets}
        onChangeAsset={action('asset changed')}
        fee={0.00075}
        percentage={0.07}
      />
    );
  });

storiesOf('Fee Panel', module)
  .addDecorator(s => setLayoutSize(400, 40, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Fee Panel (400 x 40)', () => {
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
      <FeePanel
        assets={assets}
        onChangeAsset={action('asset changed')}
        fee={0.00075}
        percentage={0.07}
      />
    );
  });
