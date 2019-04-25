import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NAV_URLS from 'enums/nav-urls';

export default function withActiveNavUrl(WrappedComponent) {
  class ActiveNavUrl extends React.Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string
      })
    };

    displayName = 'withActiveNavUrl';

    _getActiveUrlName() {
      const { location } = this.props;
      const { pathname } = location;
      const activeUrl = NAV_URLS.find(navUrl => pathname.includes(navUrl.url));

      return activeUrl ? activeUrl.name : '';
    }

    render() {
      return (
        <WrappedComponent
          activeUrlName={this._getActiveUrlName()}
          {...this.props}
        />
      );
    }
  }

  return withRouter(ActiveNavUrl);
}
