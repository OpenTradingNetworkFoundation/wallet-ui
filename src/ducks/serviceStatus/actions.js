import { createAction } from 'redux-act';

export const PING = 'app/serviceStatus/PING';
export const PING_FAIL = 'app/serviceStatus/PING_FAIL';
export const PING_SUCCESS = 'app/serviceStatus/PING_SUCCESS';
export const PING_CANCEL = 'app/serviceStatus/PING_CANCEL';

export const ping = createAction(PING);
export const pingFailure = createAction(PING_FAIL);
export const pingSuccess = createAction(PING_SUCCESS);
export const pingCancel = createAction(PING_CANCEL);

export const BACKOFF = 'app/serviceStatus/BACKOFF';
export const BACKOFF_COMPLETE = 'app/serviceStatus/BACKOFF_COMPLETE';

export const backoff = createAction(BACKOFF);
export const backoffComplete = createAction(BACKOFF_COMPLETE);

export const COUNTDOWN = 'app/serviceStatus/COUNTDOWN';
export const countdown = createAction(COUNTDOWN);

export const GATEWAY_IS_ACTIVE = 'app/serviceStatus/GATEWAY_IS_ACTIVE';
export const GATEWAY_IS_DOWN = 'app/serviceStatus/GATEWAY_IS_DOWN';

export const gatewayIsActive = createAction(GATEWAY_IS_ACTIVE);
export const gatewayIsDown = createAction(GATEWAY_IS_DOWN);

export const NODE_IS_ACTIVE = 'app/serviceStatus/NODE_IS_ACTIVE';
export const NODE_IS_DOWN = 'app/serviceStatus/NODE_IS_DOWN';

export const nodeIsActive = createAction(NODE_IS_ACTIVE);
export const nodeIsDown = createAction(NODE_IS_ACTIVE);

export const FAUCET_IS_ACTIVE = 'app/serviceStatus/FAUCET_IS_ACTIVE';
export const FAUCET_IS_DOWN = 'app/serviceStatus/FAUCET_IS_DOWN';

export const faucetIsActive = createAction(NODE_IS_ACTIVE);
export const faucetIsDown = createAction(NODE_IS_ACTIVE);

const REPORT_GATEWAY_STATUS = 'app/serviceStatus/REPORT_GATEWAY_STATUS';
const REPORT_NODE_STATUS = 'app/serviceStatus/REPORT_NODE_STATUS';
const REPORT_FAUCET_STATUS = 'app/serviceStatus/REPORT_FAUCET_STATUS';

export const reportGatewayStatus = createAction(REPORT_GATEWAY_STATUS);
export const reportNodeStatus = createAction(REPORT_NODE_STATUS);
export const reportFaucetStatus = createAction(REPORT_FAUCET_STATUS);

const APPLICATION_STARTUP = 'app/serviceStatus/APPLICATION_STARTUP';
const APPLICATION_STARTUP_FAILURE =
  'app/serviceStatus/APPLICATION_STARTUP_FAILURE';
const APPLICATION_STARTUP_SUCCESS =
  'app/serviceStatus/APPLICATION_STARTUP_SUCCESS';

export const applicationStartup = createAction(APPLICATION_STARTUP);
export const applicationStartupFailure = createAction(
  APPLICATION_STARTUP_FAILURE
);
export const applicationStartupSuccess = createAction(
  APPLICATION_STARTUP_SUCCESS
);
