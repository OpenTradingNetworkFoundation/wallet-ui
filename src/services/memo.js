import { TransactionHelper, Aes, hash } from 'bitsharesjs';
import { isString, get, chunk } from 'lodash';

const isValidPublicKey = key =>
  Boolean(key) && !/111111111111111111111/.test(key);

export const hasNotNullMemoKey = account => {
  return isValidPublicKey(get(account, 'options.memo_key', null));
};

const toHex = str =>
  [...str].map(c => Number(c.charCodeAt()).toString(16)).join('');

const fromHex = hex =>
  chunk([...hex], 2)
    .map(arr => arr.join(''))
    .map(value => parseInt(value, 16))
    .map(code => String.fromCharCode(code))
    .join('');

const getCheckSum = message =>
  hash
    .sha256(message)
    .slice(0, 4)
    .toString('hex');

const messageToHex = message => getCheckSum(message) + toHex(message);

export const hexToMessage = (hex = '') => {
  const checkSum = hex.slice(0, 8);
  const message = fromHex(hex.slice(8));

  return getCheckSum(message) === checkSum ? message : '';
};

export const getMemo = (
  privateKey,
  publicKey,
  recipientPublicKey,
  memoPayload
) => {
  const nonce = TransactionHelper.unique_nonce_uint64();

  const shouldEncrypt =
    isValidPublicKey(recipientPublicKey) && isValidPublicKey(publicKey);
  const payload = isString(memoPayload)
    ? memoPayload
    : JSON.stringify(memoPayload);

  const message = shouldEncrypt
    ? Aes.encrypt_with_checksum(privateKey, recipientPublicKey, nonce, payload)
    : messageToHex(payload);

  return {
    message,
    from: publicKey,
    to: recipientPublicKey,
    nonce
  };
};

export const getMessageFromMemo = () => {}; // TODO
