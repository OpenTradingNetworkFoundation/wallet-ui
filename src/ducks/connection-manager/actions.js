import { createAction } from 'redux-act';

const CONNECT = 'app/connectionManager/CONNECT';
const DISCONNECT = 'app/connectionManager/DISCONNECT';

const REGISTER_CONNECT = 'app/connectionManager/REGISTER_CONNECT';
const REGISTER_DISCONNECT = 'app/connectionManager/REGISTER_DISCONNECT';

const ATTEMPT_RECONNECT = 'app/connectionManager/ATTEMPT_RECONNECT';

const REGISTER_CURRENT_NODE = 'app/connectionManager/REGISTER_CURRENT_NODE';

const connect = createAction(CONNECT);
const disconnect = createAction(DISCONNECT);

const registerConnect = createAction(REGISTER_CONNECT);
const registerDisconnect = createAction(REGISTER_DISCONNECT);

const attemptReconnect = createAction(ATTEMPT_RECONNECT);
const registerCurrentNode = createAction(REGISTER_CURRENT_NODE);

export default {
  connect,
  disconnect,
  registerConnect,
  registerDisconnect,
  attemptReconnect,
  registerCurrentNode
};
