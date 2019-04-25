import { Apis } from 'bitsharesjs-ws';
import { last, prop, compose, split, nth, add, toString, concat } from 'ramda';
import { TransactionBuilder } from 'bitsharesjs';

const LIMIT = 100;

const nextId = compose(concat('1.7.'), toString, add(1), nth(2), split('.'));

const getNextOrderId = compose(
  id => (id ? nextId(id) : null),
  prop('id'),
  last
);

const getLimitOrders = (baseId, quoteId, depth) =>
  Apis.instance()
    .db_api()
    .exec('get_limit_orders', [baseId, quoteId, depth]);

export async function getOrders(baseId, quoteId) {
  const limitOrderDepth = 1000;

  return await getLimitOrders(baseId, quoteId, limitOrderDepth);
}

export const getOpenOrders = async (accountId, limit = LIMIT, from = null) => {
  return await Apis.instance()
    .db_api()
    .exec('get_active_limit_orders', [accountId, limit, from]);
};

export const getAllOpenOrders = async accountId => {
  let orders = [];
  let part;
  const limit = 100;

  do {
    part = await getOpenOrders(accountId, limit, getNextOrderId(orders));
    orders = orders.concat(part);
  } while (part.length === limit);

  return orders;
};

export const closeOrder = async (order, accountId, keys) => {
  const { privateKey, publicKey } = keys;

  let tr = new TransactionBuilder();
  const { id, base: { id: feeAssetId } } = order;

  const operationParams = {
    fee: {
      amount: 0,
      asset_id: feeAssetId
    },
    fee_paying_account: accountId,
    order: id
  };

  let transfer_op = tr.get_type_operation(
    'limit_order_cancel',
    operationParams
  );

  await tr.update_head_block();

  tr.add_operation(transfer_op);
  tr.add_signer(privateKey, publicKey);

  await tr.set_required_fees(feeAssetId, true);

  await tr.broadcast();
};
