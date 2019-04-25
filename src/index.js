import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from 'pages/App';
import { initializeApi } from 'api';
import localizer from 'utils/localizer';
import networkConfig from 'utils/networkConfig';
import { accountActions } from 'ducks/account';
import { getAccountByName } from 'api/accountApi';
import authService from 'services/authService';
import userActivityMonitor from 'services/userActivityMonitor';
import Validator from 'utils/Validator';
import env from 'utils/env';
import log from 'utils/log';
import { serviceStatusActions } from 'ducks/serviceStatus';

import store, { history } from './store';
import './resources';

const APP_DIV_ID = 'app';
const CONFIG_PATH = process.env.PUBLIC_URL + 'config/config.json';
log(`version ${env.getVersion()}`);
networkConfig
  .load(CONFIG_PATH)
  .then(() => localizer.loadLocale())
  .then(() =>
    initializeApi(
      networkConfig.get('nodes.0.url'),
      networkConfig.get('network')
    )
  )
  .then(() => {
    // check if was logged in
    const name = authService.getAuthName();
    if (!name) {
      return;
    }

    return getAccountByName(name)
      .then(account => {
        if (account) {
          store.dispatch(accountActions.update(account));
          store.dispatch(serviceStatusActions.applicationStartupSuccess());
        }
      })
      .catch();
  })
  .catch(err => {
    log(err);
    store.dispatch(serviceStatusActions.applicationStartupFailure());
  })
  .finally(() => {
    userActivityMonitor.init();
    renderApp();
  });

Validator.init();

function renderApp() {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById(APP_DIV_ID)
  );
}
