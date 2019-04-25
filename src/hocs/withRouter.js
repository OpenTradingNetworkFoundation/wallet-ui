import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions, routerSelectors } from 'ducks/router';

export default function withRouter(WrappedComponent) {
  class RouterComponent extends React.Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
        from: PropTypes.object
      }),

      routerActions: PropTypes.shape({
        navigate: PropTypes.func
      })
    };

    displayName = 'withRouterActions';

    render() {
      return (
        <WrappedComponent
          routerActions={this.props.routerActions}
          location={this.props.location}
          {...this.props}
        />
      );
    }
  }

  return connect(
    state => ({
      location: routerSelectors.location(state)
    }),
    dispatch => ({
      routerActions: {
        navigate: bindActionCreators(routerActions.navigate, dispatch),
        back: bindActionCreators(routerActions.back, dispatch)
      }
    })
  )(RouterComponent);
}
