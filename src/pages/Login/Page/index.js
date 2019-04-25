import React from 'react';
import QueryParams from 'components/QueryParams';
import withRouter from 'hocs/withRouter';

import LoginForm from '../Form';

class LoginPage extends React.Component {
  render() {
    return (
      <QueryParams
        params={{
          accountName: {
            validator: value => value && value.match(/^[a-z]+[a-z0-9-]*$/),
            default: ''
          }
        }}
        render={queryParams => <LoginForm queryParams={queryParams} />}
      />
    );
  }
}

export default withRouter(LoginPage);
