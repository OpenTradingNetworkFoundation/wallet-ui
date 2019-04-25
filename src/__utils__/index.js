import React from 'react';

import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';

import { configureStore } from 'src/store';

/**
 *
 * @param {React.Component} component
 * @param {object} initialState
 * @param {string} initialRoute
 */
export const renderWithRedux = (
  component,
  initialState = {},
  initialRoute = '/'
) => {
  const history = createMemoryHistory();
  const store = configureStore(initialState, history);
  history.push(initialRoute);

  return {
    ...render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{component}</ConnectedRouter>
      </Provider>
    ),
    history,
    store
  };
};

export const componentWithRedux = (ui, state = {}) => {
  const history = createMemoryHistory();
  const store = configureStore(state, history);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{ui}</ConnectedRouter>
    </Provider>
  );
};
