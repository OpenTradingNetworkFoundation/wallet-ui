import React from 'react';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import store from 'src/store';
import App from 'pages/App';

test('it should render', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
});
