import makeHTTPRequest from 'utils/makeHTTPRequest';
import networkConfig from 'utils/networkConfig';

export function getDepositAddress(accountId, asset) {
  return makeHTTPRequest(
    `${networkConfig.get(
      'api.gateway'
    )}/user/${accountId}/deposit/${asset.toLowerCase()}/address`,
    {
      method: 'GET'
    }
  );
}

export function validateWithdrawalAddress({ asset, address }) {
  return makeHTTPRequest(
    `${networkConfig.get('api.gateway')}/validate/${asset}/address/${address}`,
    {
      method: 'GET'
    }
  );
}

export async function getAssets() {
  return await makeHTTPRequest(`${networkConfig.get('api.gateway')}/assets`, {
    method: 'GET'
  });
}

export async function getOperations(accountId) {
  const history = await makeHTTPRequest(
    `${networkConfig.get('api.gateway')}/user/${accountId}/operations`,
    { method: 'GET' }
  );

  return history.operations;
}

export async function getInfo() {
  return await makeHTTPRequest(`${networkConfig.get('api.gateway')}/info`, {
    method: 'GET'
  });
}
