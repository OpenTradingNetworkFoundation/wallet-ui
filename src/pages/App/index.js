import React from 'react';
import { Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Route from 'elements/Route';

import URL from 'enums/url';

import LoginPage from 'pages/Login/Page';
import SignUpPage from 'pages/SignUp/Page';
import MainPage from 'pages/MainPage';
import ErrorBoundary from 'components/ErrorBoundary';
import { SERVICE, ERROR } from 'enums/serviceStatus';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary
        required={SERVICE.APPLICATION_STARTUP}
        type={ERROR[SERVICE.APPLICATION_STARTUP]}
      >
        <main>
          <Switch>
            <Route
              exact
              path={URL.LOGIN}
              check={{ auth: false }}
              component={LoginPage}
            />
            <Route
              exact
              path={URL.SIGN_UP}
              check={{ auth: false }}
              component={SignUpPage}
            />
            <Route
              path={URL.ROOT}
              check={{ auth: true }}
              component={MainPage}
            />
          </Switch>
        </main>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
