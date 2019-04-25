import PropTypes from 'prop-types';
import { SERVICE, ERROR } from 'enums/serviceStatus';

export const propTypes = {
  type: PropTypes.oneOf([
    ERROR[500],
    ERROR[404],
    ERROR.GENERIC,
    ERROR[SERVICE.GATEWAY],
    ERROR[SERVICE.NODE],
    ERROR[SERVICE.APPLICATION_STARTUP]
  ]),
  required: PropTypes.oneOf([
    SERVICE.GATEWAY,
    SERVICE.FAUCET,
    SERVICE.NODE,
    SERVICE.APPLICATION_STARTUP
  ]),

  serviceStatus: PropTypes.shape({
    gateway: PropTypes.bool,
    node: PropTypes.bool
  }),

  errorHandlerActions: PropTypes.shape({
    gatewayError: PropTypes.func,
    nodeError: PropTypes.func,
    genericError: PropTypes.func
  }),

  render: PropTypes.func,
  renderTitle: PropTypes.func,
  renderStatus: PropTypes.func,
  renderDescription: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
