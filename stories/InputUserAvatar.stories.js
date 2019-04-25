import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';

import InputUserAvatar from 'components/InputUserAvatar';

import BACKGROUND from './enums/background';
import setLayoutSize from './utils/setLayoutSize';

const DefaultUserAvatar = null;

storiesOf('Input User Avatar', module)
  .addDecorator(s => setLayoutSize(195, 33, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Input with image', () => (
    <InputUserAvatar
      inputProps={{
        mods: ['white'],
        placeholder: 'Placeholder'
      }}
      Image={DefaultUserAvatar}
    />
  ))
  .add('Input with classNames', () => (
    <InputUserAvatar
      inputProps={{
        mods: ['white'],
        placeholder: 'Placeholder',
        className: 'input-class-name'
      }}
      Image={DefaultUserAvatar}
      className="input-user-avatar-class-name"
    />
  ));

storiesOf('Input User Avatar', module)
  .addDecorator(s => setLayoutSize(245, 33, s))
  .addDecorator(backgrounds([{ ...BACKGROUND.WORKING_AREA, default: true }]))
  .add('Input with image (width 245px)', () => (
    <InputUserAvatar
      inputProps={{
        mods: ['white'],
        placeholder: 'Placeholder'
      }}
      Image={DefaultUserAvatar}
    />
  ));
