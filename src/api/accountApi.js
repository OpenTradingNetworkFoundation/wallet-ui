import { Apis } from 'bitsharesjs-ws';

import getErrorMessage from 'helpers/getErrorMessage';
import makeHTTPRequest from 'utils/makeHTTPRequest';
import networkConfig from 'utils/networkConfig';

export async function getAccountByName(name) {
  return await Apis.instance()
    .db_api()
    .exec('get_account_by_name', [name]);
}

export async function getAccountById(id) {
  const accounts = await getAccounts([id]);

  return accounts.length ? accounts[0] : null;
}

export async function createAccount(name, keys) {
  const account = {
    name,
    active_key: keys.active,
    memo_key: keys.memo,
    owner_key: keys.owner
  };

  try {
    await makeHTTPRequest(`${networkConfig.get('api.faucet')}/accounts`, {
      method: 'POST',
      body: JSON.stringify({ account })
    });
  } catch (err) {
    const { error: { code } } = err;
    throw getErrorMessage(`sign-up-${code}`, { name });
  }
}

export async function checkIfExist(name) {
  const account = await getAccountByName(name);

  return Boolean(account);
}

export async function getAccounts(ids) {
  return await Apis.instance()
    .db_api()
    .exec('get_accounts', [ids]);
}
