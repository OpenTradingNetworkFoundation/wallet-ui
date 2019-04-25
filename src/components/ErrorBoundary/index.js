import React from 'react';
import { connect } from 'react-redux';

import withRouter from 'hocs/withRouter';
import Error500 from 'components/ErrorBoundary/500';
import ErrorGeneric from 'components/ErrorBoundary/Generic';
import Error404 from 'components/ErrorBoundary/404';
import ErrorGateway from 'components/ErrorBoundary/Gateway';
import ErrorNode from 'components/ErrorBoundary/Node';

import { errorHandlerActions } from 'ducks/errorHandler';
import { serviceStatusSelectors } from 'ducks/serviceStatus';

import { bindActionCreators } from 'redux';
import { SERVICE, ERROR } from 'enums/serviceStatus';

import { propTypes } from './props';

const boundary = type => {
  switch (type) {
    case ERROR[500]:
      return Error500;
    case ERROR[404]:
      return Error404;
    case ERROR[SERVICE.GATEWAY]:
      return ErrorGateway;
    case ERROR[SERVICE.APPLICATION_STARTUP]:
      return ErrorNode;
    default:
      return ErrorGeneric;
  }
};

class ErrorBoundary extends React.PureComponent {
  static propTypes = propTypes;

  state = {
    hasError: false
  };

  static getDerivedStateFromProps(props) {
    if (props.serviceStatus[props.required] === false) {
      return {
        hasError: true
      };
    } else if (props.required && props.serviceStatus[props.required] === true) {
      return {
        hasError: false
      };
    }

    return null;
  }

  componentDidMount() {
    const { required, serviceStatus } = this.props;

    if (serviceStatus[required] === false) {
      if (required === SERVICE.GATEWAY) {
        this.props.errorHandlerActions.gatewayError();
      } else if (required === SERVICE.NODE) {
        this.props.errorHandlerActions.nodeError();
      } else {
        this.props.errorHandlerActions.genericError();
      }
    }
  }

  componentDidCatch(error) {
    const { required } = this.props;

    if (required === SERVICE.GATEWAY) {
      this.props.errorHandlerActions.gatewayError(error);
    } else if (required === SERVICE.NODE) {
      this.props.errorHandlerActions.nodeError(error);
    } else {
      this.props.errorHandlerActions.genericError(error);
    }

    this.setState({ hasError: true, error });
  }

  render() {
    const {
      type,
      render,
      renderTitle,
      renderStatus,
      renderDescription
    } = this.props;

    const Boundary = boundary(type);

    return this.state.hasError
      ? (render && render()) || (
          <Boundary
            renderTitle={renderTitle}
            renderStatus={renderStatus}
            renderDescription={renderDescription}
          />
        )
      : this.props.children;
  }
}

export default connect(
  state => ({
    serviceStatus: serviceStatusSelectors.status(state)
  }),
  dispatch => ({
    errorHandlerActions: {
      gatewayError: bindActionCreators(
        errorHandlerActions.gatewayError,
        dispatch
      ),
      nodeError: bindActionCreators(errorHandlerActions.nodeError, dispatch),
      genericError: bindActionCreators(
        errorHandlerActions.genericError,
        dispatch
      )
    }
  })
)(withRouter(ErrorBoundary));
