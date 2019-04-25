import { TransactionBuilder } from 'bitsharesjs';

const ORDER_TTL = 60000;

export async function getSendFee(params) {
  const { amount, assetId, feeAssetId, senderId, recipientId, memo } = params;

  let tr = new TransactionBuilder();
  let operationParams = {
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

  let transferOperation = tr.get_type_operation('transfer', operationParams);

  await tr.update_head_block();
  tr.add_operation(transferOperation);

  await tr.set_required_fees(feeAssetId, true);

  const [, resultFee] = transferOperation;
  return resultFee.fee.amount;
}

export async function getExchangeFee(params, keys) {
  const { privateKey, publicKey } = keys;
  const { from, to, feeAssetId, accountId } = params;

  let tr = new TransactionBuilder();
  let transfer_op = tr.get_type_operation('limit_order_create', {
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
    expiration: new Date(Date.now() + ORDER_TTL),
    fill_or_kill: true
  });

  await tr.update_head_block();

  tr.add_operation(transfer_op);
  tr.add_signer(privateKey, publicKey);

  await tr.set_required_fees(feeAssetId, true);

  return transfer_op[1].fee.amount;
}
