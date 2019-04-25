import { Apis } from 'bitsharesjs-ws';
import { TransactionBuilder } from 'bitsharesjs';

import { fromApi } from 'formatters/balanceFormatter';

export function getBalance(accountId, assets) {
  const assetIds = assets.map(asset => asset.id);

  return Apis.instance()
    .db_api()
    .exec('get_account_balances', [accountId, assetIds])
    .then(res => fromApi(res, assets));
}

export const getVestingBalances = accountId =>
  Apis.instance()
    .db_api()
    .exec('get_vesting_balances', [accountId]);

export async function withdrawVestingBalance(
  { balanceId, accountId, amount, assetId },
  keys
) {
  const { privateKey, publicKey } = keys;

  let tr = new TransactionBuilder();

  const operationParams = {
    fee: {
      amount: 0,
      asset_id: assetId
    },
    vesting_balance: balanceId,
    owner: accountId,
    amount: {
      amount,
      asset_id: assetId
    }
  };

  let transfer_op = tr.get_type_operation(
    'vesting_balance_withdraw',
    operationParams
  );

  await tr.update_head_block();

  tr.add_operation(transfer_op);
  tr.add_signer(privateKey, publicKey);
  await tr.set_required_fees(assetId, true);
  return await tr.broadcast();
}
