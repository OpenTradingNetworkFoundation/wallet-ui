import { configure, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered';
import 'babel-polyfill';
import 'normalize.css';

import localizer from 'utils/localizer';

localizer.loadLocale().then(() => {
  addDecorator(centered);

  // automatically import all files ending in *.stories.js
  const req = require.context('../stories', true, /.stories.js$/);
  function loadStories() {
    req.keys().forEach(filename => req(filename));
  }

  configure(loadStories, module);
});
