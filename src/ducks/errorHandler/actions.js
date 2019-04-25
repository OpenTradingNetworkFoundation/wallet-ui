import { createAction } from 'redux-act';

const HANDLE_ERROR = 'app/errorHandler/HANDLE_ERROR';
const GENERIC_ERROR = 'app/errorHandler/GENERIC_ERROR';

const HANDLE_GATEWAY_ERROR = 'app/errorHandler/HANDLE_GATEWAY_ERROR';
const GATEWAY_ERROR = 'app/errorHandler/GATEWAY_ERROR';

const HANDLE_NODE_ERROR = 'app/errorHandler/HANDLE_NODE_ERROR';
const NODE_ERROR = 'app/errorHandler/NODE_ERROR';

const HANDLE_FAUCET_ERROR = 'app/errorHandler/HANDLE_FAUCET_ERROR';
const FAUCET_ERROR = 'app/errorHandler/FAUCET_ERROR';

const HANDLE_SERVICE_AVAILABLE = 'app/errorHandler/HANDLE_SERVICE_AVAILABLE';

const handleError = createAction(HANDLE_ERROR);
const genericError = createAction(GENERIC_ERROR);

const handleGatewayError = createAction(HANDLE_GATEWAY_ERROR);
const gatewayError = createAction(GATEWAY_ERROR);

const handleNodeError = createAction(HANDLE_NODE_ERROR);
const nodeError = createAction(NODE_ERROR);

const handleFaucetError = createAction(HANDLE_FAUCET_ERROR);
const faucetError = createAction(FAUCET_ERROR);

const handleServiceAvailable = createAction(HANDLE_SERVICE_AVAILABLE);

export default {
  handleError,
  genericError,

  handleGatewayError,
  gatewayError,

  handleNodeError,
  nodeError,

  handleFaucetError,
  faucetError,

  handleServiceAvailable
};
