import React from 'react';

import { storiesOf } from '@storybook/react';

import NavigationBar from 'components/NavigationBar';

storiesOf('Navigation Bar', module).add('default state', () => (
  <NavigationBar />
));
