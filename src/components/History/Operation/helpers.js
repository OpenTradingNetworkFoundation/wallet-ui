import { INTERNAL_TYPE, STATUS } from 'enums/operation';
import translate from 'services/translate';

export const statusText = (state, internalType) => {
  if (STATUS.PENDING.includes(state)) {
    switch (internalType) {
      case INTERNAL_TYPE.RECEIVE: {
        return translate('component.Operation.receiving');
      }
      case INTERNAL_TYPE.SEND: {
        return translate('component.Operation.sending');
      }
      case INTERNAL_TYPE.EXCHANGE_IN:
      case INTERNAL_TYPE.EXCHANGE_OUT: {
        return translate('component.Operation.exchange');
      }
      case INTERNAL_TYPE.DETOKENIZE: {
        return translate('component.Operation.detokenize');
      }
      case INTERNAL_TYPE.TOKENIZE: {
        return translate('component.Operation.tokenize');
      }
      default:
        return '';
    }
  } else if (STATUS.DONE.includes(state)) {
    switch (internalType) {
      case INTERNAL_TYPE.RECEIVE: {
        return translate('component.Operation.received');
      }
      case INTERNAL_TYPE.SEND: {
        return translate('component.Operation.sent');
      }
      case INTERNAL_TYPE.EXCHANGE_IN:
      case INTERNAL_TYPE.EXCHANGE_OUT: {
        return translate('component.Operation.exchange');
      }
      case INTERNAL_TYPE.DETOKENIZE: {
        return translate('component.Operation.detokenize');
      }
      case INTERNAL_TYPE.TOKENIZE: {
        return translate('component.Operation.tokenize');
      }
      case INTERNAL_TYPE.VESTING_BALANCE_WITHDRAW: {
        return translate('component.Operation.vestingBalanceWithdraw');
      }
      default:
        return '';
    }
  } else if (STATUS.FAILED.includes(state)) {
    switch (internalType) {
      case INTERNAL_TYPE.RECEIVE: {
        return translate('component.Operation.failed.receive');
      }
      case INTERNAL_TYPE.SEND: {
        return translate('component.Operation.failed.send');
      }
      case INTERNAL_TYPE.EXCHANGE_IN:
      case INTERNAL_TYPE.EXCHANGE_OUT: {
        return translate('component.Operation.failed.exchange');
      }
      case INTERNAL_TYPE.DETOKENIZE: {
        return translate('component.Operation.failed.detokenize');
      }
      case INTERNAL_TYPE.TOKENIZE: {
        return translate('component.Operation.failed.tokenize');
      }
      default:
        return translate('component.Operation.failed.default');
    }
  } else {
    return translate('component.Operation.unknown');
  }
};

export const getIndicatorType = (state, internalType) =>
  Object.entries({
    pending: STATUS.PENDING.includes(state),
    receive:
      STATUS.DONE.includes(state) && internalType === INTERNAL_TYPE.RECEIVE,
    send: STATUS.DONE.includes(state) && internalType === INTERNAL_TYPE.SEND,
    exchange:
      STATUS.DONE.includes(state) &&
      (internalType === INTERNAL_TYPE.EXCHANGE_IN ||
        internalType === INTERNAL_TYPE.EXCHANGE_OUT),
    tokenize:
      STATUS.DONE.includes(state) && internalType === INTERNAL_TYPE.TOKENIZE,
    detokenize:
      STATUS.DONE.includes(state) && internalType === INTERNAL_TYPE.DETOKENIZE,
    vestingBalanceWithdraw:
      internalType === INTERNAL_TYPE.VESTING_BALANCE_WITHDRAW,
    failed: STATUS.FAILED.includes(state)
  }).reduce((a, [k, v]) => (v ? k : a), STATUS.UNKNOWN);

/**
 * get either '+' or '-' sign based on internal type of the operation
 * @param {string} internalType
 * @returns {('+' | '-' | '')}
 */
export const operationSign = internalType => {
  const positiveTypes = [
    INTERNAL_TYPE.RECEIVE,
    INTERNAL_TYPE.EXCHANGE_IN,
    INTERNAL_TYPE.TOKENIZE,
    INTERNAL_TYPE.VESTING_BALANCE_WITHDRAW
  ];

  const negativeTypes = [
    INTERNAL_TYPE.SEND,
    INTERNAL_TYPE.EXCHANGE_OUT,
    INTERNAL_TYPE.DETOKENIZE
  ];

  if (positiveTypes.includes(internalType)) {
    return '+';
  } else if (negativeTypes.includes(internalType)) {
    return '-';
  } else {
    return '';
  }
};

export const getDisplayAmount = (sign, amount) => sign.concat(amount);
