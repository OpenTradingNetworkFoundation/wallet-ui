import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from 'elements/Button';

storiesOf('Button', module).add('with label', () => (
  <Button onClick={action('clicked')} label="Hello Button" />
));
