import { ChainTypes } from 'bitsharesjs';
import { get, omitBy, isUndefined } from 'lodash';

import localizer from 'utils/localizer';
import translate from 'services/translate';

import {
  OPERATION,
  INTERNAL_TYPE,
  STATUS,
  EXTERNAL_STATUS
} from 'enums/operation';

import { CATEGORY } from '../enums/toast';

const { operations } = ChainTypes;
const OPERATIONS = Object.keys(operations);

export function operationName(operation) {
  const operationId = get(operation, 'op[0]');

  return OPERATIONS[operationId];
}

export function operationTitle(operation) {
  const category = operation.internalType;
  switch (category) {
    case CATEGORY.SEND:
      return localizer.getValue('operation.youSent');
    case CATEGORY.RECEIVE:
      return localizer.getValue('operation.youReceived');
    case CATEGORY.EXCHANGE:
      return localizer.getValue('operation.exchange');
    case CATEGORY.VESTING_BALANCE_WITHDRAW:
      return translate('operation.youWithdrew');
    default:
      return '';
  }
}
/**
 * Get operation category
 * @param {object} operation - operation object
 * @param {string} accountId - user account id
 */
export function operationCategory(operation, accountId) {
  if (isOperationTransfer(operation)) {
    const isOperationSend = operation.op[1].from === accountId;
    return isOperationSend ? CATEGORY.SEND : CATEGORY.RECEIVE;
  } else if (isOperationFillOrder(operation)) {
    return CATEGORY.EXCHANGE;
  } else if (isOperationVestingBalanceWithdraw(operation)) {
    return CATEGORY.VESTING_BALANCE_WITHDRAW;
  }
}

export function addOperationResult(operation, index, operations) {
  const { op: [, { order_id: orderId }] } = operation;

  const resultTransaction = orderId
    ? operations.find(op => {
        const { result: [, resultOperationId] } = op;
        return orderId === resultOperationId;
      })
    : null;
  const resultOperation = resultTransaction ? resultTransaction.op[1] : null;

  return {
    ...operation,
    result: resultOperation ? resultOperation : operation.result
  };
}

export function isOperationTransfer(operation) {
  return operationName(operation) === OPERATION.TRANSFER;
}

export const isOperationVestingBalanceWithdraw = operation =>
  operationName(operation) === OPERATION.VESTING_BALANCE_WITHDRAW;

export function isOperationFillOrder(operation) {
  return operationName(operation) === OPERATION.FILL_ORDER;
}

export const operationOrderId = operation => operation.op[1].order_id;

export const formatInternalOperation = accountId => operation => {
  const internalType = operationCategory(operation, accountId);
  const {
    id,
    block_num,
    op: [, { fee, order_id, account_id, pays, receives, from, to, amount }],
    result
  } = operation;

  const resultFee =
    internalType === INTERNAL_TYPE.EXCHANGE && result.fee ? result.fee : null;

  return omitBy(
    {
      internalType,
      id,
      key: id,
      amount: amount && { amount: amount.amount, assetId: amount.asset_id },
      fee: resultFee
        ? { amount: resultFee.amount, assetId: resultFee.asset_id }
        : fee && { amount: fee.amount, assetId: fee.asset_id },
      transactionId: id,
      blockNumber: block_num,
      orderId: order_id,
      accountId: account_id,
      pays,
      receives,
      from,
      to,
      state: EXTERNAL_STATUS.PROCESSED,
      internalState: EXTERNAL_STATUS.PROCESSED
    },
    isUndefined
  );
};

const typeToInternalTypeMap = {
  deposit: INTERNAL_TYPE.TOKENIZE,
  withdrawal: INTERNAL_TYPE.DETOKENIZE
};

const internalStatus = state =>
  Object.entries({
    pending: STATUS.PENDING.includes(state),
    done: STATUS.DONE.includes(state),
    failed: STATUS.FAILED.includes(state)
  }).reduce((a, [k, v]) => (v ? k : a), STATUS.UNKNOWN);

export const formatExternalOperation = ({
  id,
  user_id,
  state,
  type,
  amount,
  fee,
  asset_id,
  external_tx_hash,
  tx_hash,
  confirmations,
  time_created,
  last_updated,
  external_address
}) => {
  return {
    id,
    key: id,
    amount: { amount, assetId: asset_id },
    fee: { amount: fee, assetId: asset_id },
    internalType: typeToInternalTypeMap[type],
    confirmations,
    type,
    state,
    userId: user_id,
    internalState: internalStatus(state),
    externalTransactionId: external_tx_hash,
    internalTransactionId: tx_hash,
    timeCreated: time_created,
    lastUpdated: last_updated,
    externalAddress: external_address
  };
};
