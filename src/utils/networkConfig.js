import { get } from 'lodash';

import makeHTTPRequest from 'utils/makeHTTPRequest';

class NetworkConfig {
  load(url) {
    return makeHTTPRequest(url).then(response => {
      this._config = response;
    });
  }

  get(key) {
    return get(this._config, key);
  }
}

const networkConfig = new NetworkConfig();

export default networkConfig;
