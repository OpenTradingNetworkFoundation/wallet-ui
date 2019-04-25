import React from 'react';

import { storiesOf } from '@storybook/react';

import TokenizedCoin from 'elements/TokenizedIcon';
import { ASSET, ASSET_ICON } from 'enums/asset';

import setLayoutSize from './utils/setLayoutSize';

storiesOf('TokenizedIcon', module)
  .addDecorator(s => setLayoutSize(150, 150, s))
  .add('OTN.BTC', () => <TokenizedCoin Icon={ASSET_ICON[ASSET.BTC]} />)
  .add('OTN.ETH', () => <TokenizedCoin Icon={ASSET_ICON[ASSET.ETH]} />);
