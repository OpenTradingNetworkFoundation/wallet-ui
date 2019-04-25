import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route as ReactRoute, Redirect } from 'react-router-dom';
import EnterPassword from 'pages/EnterPassword';
import URL from 'enums/url';

import { authSelectors } from 'ducks/auth';
import { accountSelectors } from 'ducks/account';

class Route extends React.PureComponent {
  static propTypes = {
    ...ReactRoute.propTypes,
    check: PropTypes.shape({
      auth: PropTypes.bool,
      password: PropTypes.bool
    }),
    render: PropTypes.func
  };

  render() {
    const {
      component: Component,
      check = {},
      data,
      render,
      ...rest
    } = this.props;

    return (
      <ReactRoute
        {...rest}
        render={props => {
          if (check.auth === true && !data.auth) {
            return (
              <Redirect
                to={{ pathname: URL.LOGIN, state: { from: props.location } }}
              />
            );
          }

          if (check.auth === false && data.auth) {
            return <Redirect to={{ pathname: URL.ROOT }} />;
          }

          if (check.password === true && !data.has_token) {
            return <EnterPassword {...props} />;
          }

          return render ? render(props) : <Component {...props} />;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: {
    auth: Boolean(accountSelectors.account(state)),
    has_token: authSelectors.check(state)
  }
});

export default connect(mapStateToProps)(Route);
