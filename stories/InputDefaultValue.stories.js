import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import { action } from '@storybook/addon-actions';

import InputDefaultValue from 'components/InputDefaultValue';

import BACKGROUND from './enums/background';
import setLayoutSize from './utils/setLayoutSize';

storiesOf('Input Default Value', module)
  .addDecorator(s => setLayoutSize(195, 33, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Input with max label', () => (
    <InputDefaultValue
      inputProps={{
        mods: ['white'],
        placeholder: 'Placeholder',
        value: 'Test',
        onChange: action('changed')
      }}
      defaultValue={100}
      label="Max"
    />
  ));
