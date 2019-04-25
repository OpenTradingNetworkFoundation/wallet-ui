import { Apis } from 'bitsharesjs-ws';

import { fromApi } from 'formatters/assetsFormatter';

const START_CHAR = '';
const LIMIT = 100;

export function listAssets() {
  return Apis.instance()
    .db_api()
    .exec('list_assets', [START_CHAR, LIMIT])
    .then(res => fromApi(res));
}
