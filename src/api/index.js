import { ChainConfig } from 'bitsharesjs-ws';
import { connect } from 'services/connection';

const NETWORK_KEY = 'Otn';

export function initializeApi(url, network) {
  ChainConfig.networks[NETWORK_KEY] = network;
  return connect(url);
}
