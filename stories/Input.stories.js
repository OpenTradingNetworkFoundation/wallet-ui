import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';

import Input from 'elements/Input';

import BACKGROUND from './enums/background';
import setLayoutSize from './utils/setLayoutSize';

storiesOf('Input (Login page)', module)
  .addDecorator(s => setLayoutSize(195, 33, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.LOGIN_PAGE, default: true }]))
  .add('Input with image', () => (
    <Input mods={['dark']} placeholder="Placeholder" />
  ));

storiesOf('Input (Working area)', module)
  .addDecorator(s => setLayoutSize(195, 33, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Input', () => <Input mods={['white']} placeholder="Placeholder" />);
