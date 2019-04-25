import React from 'react';

import { storiesOf } from '@storybook/react';

import Asset from 'components/Asset';
import { ASSET } from 'enums/asset';

import setLayoutSize from './utils/setLayoutSize';

storiesOf('Asset', module)
  .addDecorator(s => setLayoutSize(570, 344, s))
  .add('570 x 344 (OTN)', () => (
    <Asset
      asset={ASSET.OTN}
      displayName="OTN"
      balance={0}
      isTokenized={false}
    />
  ))
  .add('570 x 344 (OTN.BTC)', () => (
    <Asset asset={ASSET.BTC} displayName="OTN.BTC" balance={1.501765} />
  ))
  .add('570 x 344 (OTN.ETH)', () => (
    <Asset asset={ASSET.ETH} displayName="OTN.ETH" balance={8.264091} />
  ));

storiesOf('Asset', module)
  .addDecorator(s => setLayoutSize(770, 344, s))
  .add('770 x 344 (max width)', () => (
    <Asset
      asset={ASSET.OTN}
      displayName="OTN"
      balance={0}
      isTokenized={false}
    />
  ));
