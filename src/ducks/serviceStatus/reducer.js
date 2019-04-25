import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { curry } from 'lodash';

import { SERVICE } from 'enums/serviceStatus';
import connection from 'ducks/connection-manager/reducer';

import * as actions from './actions';

const initialState = {
  gateway: false,
  faucet: false,
  node: false
};

const status = curry((service, isActive, state) => {
  return { ...state, [service]: isActive };
});

const gatewayStatus = status(SERVICE.GATEWAY);
const faucetStatus = status(SERVICE.FAUCET);
const nodeStatus = status(SERVICE.NODE);

const applicationStartup = curry((success, state) => {
  return { ...state, applicationStartup: success };
});

const reducer = createReducer(
  {
    [actions.gatewayIsDown]: gatewayStatus(false),
    [actions.gatewayIsActive]: gatewayStatus(true),
    [actions.nodeIsDown]: nodeStatus(false),
    [actions.nodeIsActive]: nodeStatus(true),
    [actions.faucetIsDown]: faucetStatus(false),
    [actions.faucetIsActive]: faucetStatus(true),
    [actions.applicationStartupFailure]: applicationStartup(false),
    [actions.applicationStartupSuccess]: applicationStartup(true)
  },
  initialState
);

export default combineReducers({
  status: reducer,
  connection: connection
});
