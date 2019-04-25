import PendingIcon from 'icons/pending-small.svg';
import ReceiveIcon from 'icons/withdraw.svg';
import SendIcon from 'icons/send.svg';
import TokenizeIcon from 'icons/tokenize.svg';
import DetokenizeIcon from 'icons/detokenize.svg';
import FailedIcon from 'icons/failed.svg';
import ExchangeIcon from 'icons/exchange-mono.svg';
import QuestionIcon from 'icons/question.svg';

const OPERATION = {
  TRANSFER: 'transfer',
  FILL_ORDER: 'fill_order',
  VESTING_BALANCE_WITHDRAW: 'vesting_balance_withdraw'
};

const OPERATION_TITLE = {
  TRANSFER: 'Exchange',
  FILL_ORDER: 'You received'
};

const EXTERNAL_STATUS = {
  PENDING: 'pending',
  SENDING: 'sending',
  WAITING: 'waiting',
  CONFIRMED: 'confirmed',
  PROCESSED: 'processed',
  FAILED: 'failed',
  CANCELED: 'canceled',
  UNKNOWN: 'unknown'
};

const STATUS = {
  PENDING: [
    EXTERNAL_STATUS.PENDING,
    EXTERNAL_STATUS.SENDING,
    EXTERNAL_STATUS.WAITING,
    EXTERNAL_STATUS.CONFIRMED
  ],
  DONE: [EXTERNAL_STATUS.PROCESSED],
  FAILED: [EXTERNAL_STATUS.FAILED, EXTERNAL_STATUS.CANCELED],
  UNKNOWN: EXTERNAL_STATUS.UNKNOWN
};

const TYPE = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawl',
  SEND: 'send',
  RECEIVE: 'receive'
};

const INTERNAL_TYPE = {
  TOKENIZE: 'tokenize',
  DETOKENIZE: 'detokenize',
  SEND: 'send',
  RECEIVE: 'receive',
  EXCHANGE: 'exchange',
  EXCHANGE_IN: 'exchange-in',
  EXCHANGE_OUT: 'exchange-out',
  VESTING_BALANCE_WITHDRAW: 'vestingBalanceWithdraw'
};

const KIND = {
  INTERNAL: 'internal',
  EXTERNAL: 'external'
};

const INDICATOR_ICON = {
  pending: PendingIcon,
  receive: ReceiveIcon,
  send: SendIcon,
  tokenize: TokenizeIcon,
  detokenize: DetokenizeIcon,
  failed: FailedIcon,
  exchange: ExchangeIcon,
  unknown: QuestionIcon,
  vestingBalanceWithdraw: ReceiveIcon
};

export {
  OPERATION,
  OPERATION_TITLE,
  STATUS,
  EXTERNAL_STATUS,
  TYPE,
  INTERNAL_TYPE,
  KIND,
  INDICATOR_ICON
};
