import { TransactionBuilder } from 'bitsharesjs';

import { EXPIRATION } from 'enums/expiration';
import { calculateExpiration } from 'utils/expiration';

export async function send(params, keys) {
  const { senderId, recipientId, amount, assetId, feeAssetId, memo } = params;

  const { privateKey, publicKey } = keys;

  let tr = new TransactionBuilder();
  const operationParams = {
    fee: {
      amount: 0,
      asset_id: feeAssetId
    },
    from: senderId,
    to: recipientId,
    amount: { amount, asset_id: assetId }
  };

  if (memo) {
    operationParams.memo = memo;
  }

  let transfer_op = tr.get_type_operation('transfer', operationParams);

  await tr.update_head_block();

  tr.add_operation(transfer_op);
  tr.add_signer(privateKey, publicKey);

  await tr.set_required_fees(feeAssetId, true);

  await tr.broadcast();
}

export async function exchange(params, keys) {
  const { privateKey, publicKey } = keys;
  const {
    from,
    to,
    feeAssetId,
    accountId,
    fillOrKill = true,
    expiration
  } = params;

  let tr = new TransactionBuilder();

  const operationPayload = {
    fee: {
      amount: 0,
      asset_id: feeAssetId
    },
    seller: accountId,
    amount_to_sell: {
      amount: from.amount,
      asset_id: from.assetId
    },
    min_to_receive: {
      amount: to.amount,
      asset_id: to.assetId
    },
    expiration: expiration || calculateExpiration(EXPIRATION.MINUTE),
    fill_or_kill: fillOrKill
  };

  let transfer_op = tr.get_type_operation(
    'limit_order_create',
    operationPayload
  );

  await tr.update_head_block();

  tr.add_operation(transfer_op);
  tr.add_signer(privateKey, publicKey);

  await tr.set_required_fees(feeAssetId, true);

  await tr.broadcast();
}
