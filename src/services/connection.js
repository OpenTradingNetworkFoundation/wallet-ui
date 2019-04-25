import { Apis } from 'bitsharesjs-ws';
import { ChainStore } from 'bitsharesjs';

import store from 'src/store';
import { connectionManagerActions } from 'ducks/connection-manager';
import { STATUS } from 'enums/connection';
import log from 'utils/log';

/**
 * Initialize api and connect to node
 * @param { string } url - node url to connect
 * @returns { Promise }
 */
export function connect(url) {
  Apis.setAutoReconnect();
  store.dispatch(connectionManagerActions.registerCurrentNode(url));

  Apis.setRpcConnectionStatusCallback(status => {
    log('connection status -> ', status);

    if (status === STATUS.OPEN) {
      store.dispatch(connectionManagerActions.registerConnect({ url }));
    }

    if (status === STATUS.CLOSED && status !== STATUS.ERROR) {
      store.dispatch(connectionManagerActions.registerDisconnect());
    }
  });

  return Apis.instance(url, true).init_promise.then(() => {
    ChainStore.init(true);
  });
}

/**
 * Reconnect on connection close
 * @param { string } url - node url to reconnect
 * @returns { Promise }
 */
export function reconnect(url) {
  return Apis.reset(url, true, undefined, {
    enableOrders: true
  }).then(instance =>
    instance.init_promise.then(() => {
      return ChainStore.resetCache(false);
    })
  );
}
